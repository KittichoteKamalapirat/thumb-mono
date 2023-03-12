import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ChannelContext } from "../contexts/ChannelContext";
import {
  useCreateTestingMutation,
  useMeChannelQuery,
  useVideosQuery,
  YoutubeVideo,
} from "../generated/graphql";
import { debounce } from "../utils/debounce";
import CreateTestEditor from "./CreateTestEditor";
import { UploadedFile } from "./DropzoneField";
import { Error } from "./skeletons/Error";
import { Loading } from "./skeletons/Loading";

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

export const FormSchema = z.discriminatedUnion("type", [
  CreateThumbTestSchema,
  CreateTitleTestSchema,
]);

export type FormValues = z.infer<typeof FormSchema>;

export type CreateTitleTestInput = FormValues;

enum FormNames {
  VIDEO_ID = "videoId",
  DURATION_TYPE = "durationType",
  DURATION = "duration",
  VARIS = "varis", // for titles
  ORI = "ori", // could be thumb url or title
  TYPE = "type",
}

const defaultValues: FormValues = {
  [FormNames.VIDEO_ID]: "PlT05VwzMlg",
  [FormNames.DURATION_TYPE]: "specific",
  [FormNames.DURATION]: 7, // in  days
  [FormNames.VARIS]: [{ value: "" }],
  [FormNames.ORI]: "original title or thumbnail url",
  [FormNames.TYPE]: "title",
};

const CreateTest = () => {
  const {
    data: channelData,
    loading: channelLoading,
    error: channelError,
  } = useMeChannelQuery();
  // const [uploads, setUploads] = useState<YoutubeVideo[]>([]);
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<YoutubeVideo[]>([]);
  const params = useParams();

  const { channel } = useContext(ChannelContext);
  const channelId = channel?.ytChannelId;

  // uncomment this
  const { data, loading, error } = useVideosQuery({
    variables: { channelId: channelId || "" },
  });

  // const uploads = [] as YoutubeVideo[];

  const uploads = data?.videos || [];

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
              videoTitle: selectedVideo?.title as string,
              videoThumbUrl: selectedVideo?.thumbUrl as string,
              varis: fileUploads.map((file) => file.url),
            };
          case "title":
            return {
              ...form,
              channelId: channelUid,
              videoTitle: selectedVideo?.title as string,
              videoThumbUrl: selectedVideo?.thumbUrl as string,
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
        navigate(`/tests/${resultValue.id}`);
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

  console.log("uploads up", uploads);
  console.log("useFormData.watch up", useFormData.watch("videoId"));
  console.log("selectedVideo up", selectedVideo);

  useEffect(() => {
    if (data?.videos) setFilteredUploads(data.videos);
  }, [channelId, loading, data]);

  useEffect(() => {
    if (!selectedVideo) return;
    if (type === "title") {
      useFormData.setValue(FormNames.ORI, selectedVideo.title as never); // TODO fix me
      return;
    }
    if (type === "thumb") {
      useFormData.setValue(FormNames.ORI, selectedVideo.thumbUrl as never); // TODO fix me
      return;
    }
  }, [selectedVideo, type]);

  useEffect(() => {
    useFormData.setValue(FormNames.TYPE, "title" as never); // TODO fix me
  }, []);

  if (loading || channelLoading) return <Loading isFullPage />;
  if (error || channelError) return <Error text="An error occured" />;

  return (
    <div>
      {/* <Navbar /> */}
      <CreateTestEditor
        uploads={uploads}
        useFormData={useFormData}
        search={search}
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
