import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { ChannelContext } from "../contexts/ChannelContext";
import { getVidList } from "../firebase/client";

import {
  useCreateTestingMutation,
  useMeChannelQuery,
  useVideosQuery,
  YoutubeVideo,
} from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { debounce } from "../utils/debounce";
import CreateTestEditor from "./CreateTestEditor";
import { UploadedFile } from "./DropzoneField";

interface Props {}

// const oauth2Client = new google.auth.OAuth2(client, secret, redirect);

const TitleSchema = z
  .object({
    value: z.string().min(1, "Title cannot be empty"),
  })
  .array();

const SharedSchema = z.object({
  videoId: z.string().min(1, { message: "Please select a video" }),
  duration: z.number(),
  durationType: z.literal("specific"),
  ori: z.string(),
});
const CreateThumbTestSchema = SharedSchema.extend({
  type: z.literal("thumb"),
});

const CreateTitleTestSchema = SharedSchema.extend({
  varis: TitleSchema,
  type: z.literal("title"),
});

// const CreateThumbTestSpecificSchema = SharedSchema.extend({
//   originalThumb: z.string(),
//   durationType: z.literal("specific"),
//   type: z.literal("thumb"),
// });

export const FormSchema = z.discriminatedUnion("type", [
  CreateThumbTestSchema,
  CreateTitleTestSchema,
]);

type CreateThumbTestFormValues = z.infer<typeof CreateThumbTestSchema>;
type CreateTitleTestFormValues = z.infer<typeof CreateTitleTestSchema>;
export type FormValues = z.infer<typeof FormSchema>;

export type CreateTitleTestInput = FormValues;

enum FormNames {
  VIDEO_ID = "videoId",
  DURATION_TYPE = "durationType",
  DURATION = "duration",
  VARIS = "varis", // for titles
  ORI = "ori", // could be thumb url or title
  TYPE = "type",
  // TYPE = "type",
}

// export interface FormValues {
//   [FormNames.VIDEO_ID]: string;
//   [FormNames.DURATION_TYPE]: DurationType;
//   [FormNames.DURATION]: number; // in days
//   // [FormNames.TYPE]: TestingType ; // TODO add this later, now only thumbnail
// }

const defaultValues: FormValues = {
  [FormNames.VIDEO_ID]: "PlT05VwzMlg",
  [FormNames.DURATION_TYPE]: "specific",
  [FormNames.DURATION]: 7, // in  days
  [FormNames.VARIS]: [{ value: "" }],
  [FormNames.ORI]: "original title or thumbnail url",
  [FormNames.TYPE]: "title",
};

const CreateTest = ({}: Props) => {
  // const [selectedUpload, setSelectedUpload] = useState<MyUpload>();

  const {
    data: channelData,
    loading: channelLoading,
    error: channelError,
  } = useMeChannelQuery();
  const [uploads, setUploads] = useState<YoutubeVideo[]>([]);
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<YoutubeVideo[]>([]);
  const params = useParams();

  const { channel } = useContext(ChannelContext);
  const channelId = channel?.channelId;

  const { data, loading, error } = useVideosQuery({
    variables: { channelId: channelId || "" },
  });
  const location = useLocation();

  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);

    const searchDebounce = debounce((query) => {
      if (query) {
        const filtered = [...uploads].filter(
          (upload) =>
            upload.title.includes(query) || upload.videoId.includes(query)
        );
        setFilteredUploads(filtered);
      } else setFilteredUploads(uploads);
    }, 1000);
    searchDebounce(query);
  };

  const useFormData = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const { durationType, duration, videoId, type } = useFormData.watch();
  const navigate = useNavigate();
  const [createTesting] = useCreateTestingMutation();

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      const channelUid = channelData?.meChannel?.id;
      if (!channelUid) return;
      const input = (() => {
        switch (form.type) {
          case "thumb":
            return {
              ...form,
              channelId: channelUid,
              varis: fileUploads.map((file) => file.url),
            };
          case "title":
            return {
              ...form,
              channelId: channelUid,
              varis: form.varis.map((vari) => vari.value),
            };
        }
      })();

      const result = await createTesting({ variables: { input } });

      const resultValue = result.data?.createTesting.testing;

      let errorMessage = "";
      const resultUserErrors = result.data?.createTesting.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
      });

      if (resultValue && resultUserErrors.length === 0) {
        navigate(resultValue.id);
        // dispatch(
        //   showToast({
        //     message: "Availability successfully updated",
        //     variant: "success",
        //   })
        // );
      } else {
        // dispatch(
        //   showToast({
        //     message: errorMessage,
        //     variant: "error",
        //   })
        // );
      }
    } catch (error) {
      console.log("error inside  catch", error);
    }
  };

  const selectedVideo = uploads?.find(
    (upload) => upload.videoId === useFormData.watch("videoId")
  );

  useEffect(() => {
    if (data?.videos) setFilteredUploads(data.videos);
  }, [channelId, loading, data]);

  useEffect(() => {
    if (!selectedVideo) return;
    if (type === "title") {
      useFormData.setValue(FormNames.ORI, selectedVideo.title);
      return;
    }
    if (type === "thumb") {
      useFormData.setValue(FormNames.ORI, selectedVideo.thumbUrl);
      return;
    }
  }, [selectedVideo, type]);

  useEffect(() => {
    useFormData.setValue(FormNames.TYPE, "title");
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <CreateTestEditor
        uploads={uploads}
        setUploads={setUploads}
        useFormData={useFormData}
        handleSearch={handleSearch}
        filteredUploads={filteredUploads}
        onSubmit={onSubmit}
        selectedVideo={selectedVideo}
        fileUploads={fileUploads}
        setFileUploads={setFileUploads}
      />
    </div>
  );
};
export default CreateTest;
