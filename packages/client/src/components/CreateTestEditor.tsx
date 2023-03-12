import { BsImage } from "react-icons/bs";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Control,
  SubmitHandler,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";

import dayjs from "dayjs";
import { IoMdClose, IoMdImages } from "react-icons/io";
import { TbLanguageHiragana } from "react-icons/tb";
import { TestingTypeObj } from "../firebase/types/Testing.type";
import { YoutubeVideo } from "../generated/graphql";
import { suggestNumTestDays } from "../utils/suggestNumTestDays";
import { FormValues } from "./CreateTest";
import DropzoneField, { UploadedFile } from "./DropzoneField";
import FormFieldLabel from "./forms/FormFieldLabel";
import TextField, { TextFieldTypes } from "./forms/TextField";
import { InputType } from "./forms/TextField/inputType";
import Searchbar from "./Searchbar";
import Select, { Option } from "./Select/Select";
import Button from "../design-system/lib/Button/Button";
import { ICON_SIZE } from "../constants";
import { grey100, grey200 } from "../theme";
import PageHeading from "./typography/PageHeading";
import SelectText from "./Select/SelectText";
import { HiOutlineTrash } from "react-icons/hi";
import IconButton from "../design-system/lib/Button/IconButton";
import { BiSearch } from "react-icons/bi";

interface Props {
  uploads: YoutubeVideo[];

  handleSearch: (query: string) => void;
  filteredUploads: YoutubeVideo[];
  useFormData: UseFormReturn<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  selectedVideo: YoutubeVideo | undefined;
  fileUploads: UploadedFile[];
  setFileUploads: Dispatch<SetStateAction<UploadedFile[]>>;
}

enum FormNames {
  VIDEO_ID = "videoId",
  DURATION_TYPE = "durationType",
  DURATION = "duration",
  VARIS = "varis",
  ORI = "ori", // could be thumb url or title
  TYPE = "type",
  // TYPE = "type",
}

const testTypeOptions: Option[] = [
  {
    id: "1",
    label: TestingTypeObj.title,
    value: "title",
    icon: <TbLanguageHiragana className="w-6 h-6" />,
  },

  {
    id: "2",
    label: TestingTypeObj.thumb,
    value: "thumb",
    icon: <IoMdImages className="w-6 h-6" />,
  },
];

const CreateTestEditor = ({
  uploads,
  fileUploads,

  handleSearch,
  filteredUploads,
  useFormData,
  onSubmit,
  selectedVideo,
  setFileUploads,
}: Props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchIcon = () => {
    setShowSearch(!showSearch);
    return;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useFormData;

  const { fields, append, remove } = useFieldArray({
    name: "varis",
    control,
  });
  const { durationType, duration, videoId, type, ori } = watch();

  // const testTypeWatch = watch(FormNames.TYPE);
  // const videoIdWatch = watch(FormNames.VIDEO_ID);
  // const durationWatch = watch(FormNames.DURATION);

  console.log("ori", ori);
  useEffect(() => {
    console.log("ori 1");
    console.log("videoId", videoId);
    console.log("selectedVideo", selectedVideo);
    if (!videoId) return;

    if (!selectedVideo) return;

    setValue(
      FormNames.ORI,
      type === "thumb"
        ? (selectedVideo?.thumbUrl as never)
        : (selectedVideo?.title as never) // TODO fix me
    );
  }, [videoId, selectedVideo]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* section 0 */}
        <div>
          <div className="grid grid-cols-12 gap-4 mt-4">
            {/* section 1 */}
            <div data-section="1" className="col-span-12 py-4">
              <div className="flex flex-col md:flex-row items-start gap-2">
                <PageHeading heading="Start a new" fontSize="text-lg" />

                <div className="w-full sm:w-1/2 md:w-1/3">
                  <SelectText
                    name={FormNames.TYPE}
                    control={control as unknown as Control}
                    options={testTypeOptions}
                    density="comfort"
                    onChange={register("type").onChange}
                    size="large"
                    label="Test Type"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section 1 */}
        <div
          data-section="1"
          className="col-span-12  border rounded-md p-4 mt-4"
        >
          <div>
            <FormFieldLabel required label="1.Select a video" />

            {/* search */}
            <div className="mb-4">
              {showSearch && (
                <FormFieldLabel
                  required
                  label="Search by title or video id"
                  fontColor="text-grey-500"
                  fontSize="text-sm"
                />
              )}
              <div className="flex w-full gap-2 items-center">
                {showSearch && (
                  <div>
                    <Searchbar query={search} onChange={handleSearch} />
                  </div>
                )}
                <IconButton
                  onClick={handleSearchIcon}
                  size="MEDIUM"
                  icon={showSearch ? IoMdClose : BiSearch}
                  type="TERTIARY"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              {filteredUploads?.slice(0, 5).map((upload, index) => {
                const selectedClass =
                  selectedVideo?.videoId === upload.videoId
                    ? "bg-primary-50"
                    : "";
                if (selectedVideo?.videoId === upload.videoId) {
                }

                return (
                  <div
                    key={upload.videoId}
                    className="flex gap-2 col-span-6 sm:col-span-4 md:col-span-2 lg:col-span-2"
                  >
                    <label
                      htmlFor={upload.videoId}
                      className={classNames(
                        "rounded-md border hover:bg-primary-50 hover:cursor-pointer w-full ",
                        `${
                          videoId === upload.videoId && "border-4 border-green"
                        }`
                      )}
                    >
                      <input
                        id={upload.videoId}
                        type="radio"
                        value={upload.videoId}
                        className="hidden"
                        {...register(FormNames.VIDEO_ID)}
                      />
                      <div>
                        <div className="font-bold">
                          <img
                            src={upload.thumbUrl}
                            className="w-full rounded-t-md"
                          />
                          <p className="text-lg p-2">
                            {upload.title.slice(0, 25)}
                            {upload.title.length > 40 && " ..."}
                          </p>
                          {/* <p>{upload.videoId}</p> */}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* section 2 Select a thumbnail */}

        {type === "title" && (
          <div
            data-section="2"
            className="col-span-12 border rounded-md p-4 mt-4"
          >
            <FormFieldLabel
              required
              label="2. What title do you want to test?"
            />

            <div className="grid grid-cols-12 gap-4">
              {/* left */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 md:border-r">
                <p className="font-bold mb-2">Original Title</p>
                {selectedVideo ? selectedVideo?.title : "Please select a video"}
              </div>

              {/* right side */}
              <div
                className={classNames(
                  "col-span-12 md:col-span-6 xl:col-span-8"
                )}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold mb-2">Test Title</p>
                  <Button
                    label="Add title"
                    onClick={() => append({ value: "" })}
                    size="SMALL"
                    type="TERTIARY"
                  />
                </div>

                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <label
                          htmlFor={`${FormNames.VARIS}.${index}.value`}
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          {index + 1}.
                        </label>
                        <input
                          type="text"
                          id={`${FormNames.VARIS}.${index}.value`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="John"
                          required
                          {...register(`${FormNames.VARIS}.${index}.value`, {
                            shouldUnregister: true,
                          })}
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          size="MEDIUM"
                          icon={HiOutlineTrash}
                          type="TERTIARY"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/* section 2 (thumbnail) */}
        {type === "thumb" && (
          <div
            data-section="2"
            className="col-span-12 border rounded-md p-4 mt-4"
          >
            <FormFieldLabel required label="2. Upload thumbnails" />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 xl:col-span-4 md:border-r">
                <p className=" text-grey-400 text-sm mb-2">
                  Original Thumbnail
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <p className=" text-grey-400 text-sm mb-2">Test Thumbnail</p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 xl:col-span-4 md:border-r md:pr-4 items-center justify-center flex ">
                {selectedVideo ? (
                  <img
                    src={selectedVideo?.thumbUrl}
                    // src="https://firebasestorage.googleapis.com/v0/b/mee-time-364614.appspot.com/o/files%2FHair_Salon_Stations.jpeg?alt=media&token=302382b1-8c3c-43c4-96cc-c25c479d586f"
                    className="w-full rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center p-2 rounded-md bg-grey-50 text-grey-300 h-full w-full border-solid border-[1px] border-grey-500">
                    <BsImage size={ICON_SIZE + 100} color={grey200} />
                    <p className="">Please select a video above</p>
                  </div>
                )}
              </div>
              <div
                className={classNames(
                  "col-span-12 md:col-span-6 xl:col-span-8",
                  fileUploads.length === 0 &&
                    "border-dashed border-[2px] rounded-xl border-grey-300 cursor-pointer p-4"
                )}
              >
                <DropzoneField
                  ariaLabel="Image"
                  fileUploads={fileUploads}
                  setFileUploads={setFileUploads}
                  showConfirmationOnDelete={false}
                  maxFiles={10}
                />
              </div>
            </div>
          </div>
        )}
        {/* section 3 */}
        <div
          data-section="3"
          className="col-span-12 border rounded-md p-4 mt-4"
        >
          {/* select duration label */}

          <FormFieldLabel
            required
            label="3. How long would you like to test?"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex item-start gap-2">
              <div>
                <TextField
                  name={FormNames.DURATION}
                  control={control as unknown as Control}
                  containerClass="w-full sm:w-80"
                  placeholder="15"
                  inputType={InputType.Number}
                  type={TextFieldTypes.OUTLINED}
                  extraClass="w-full"
                  labelClass="mt-4"
                  error={errors[FormNames.DURATION]}
                  validation={
                    durationType === "specific"
                      ? {
                          min: {
                            value: 1,
                            message: "cannot be 0",
                          },
                          max: {
                            value: 100,
                            message: "has to be less than 101",
                          },
                        }
                      : {}
                  }
                />

                {fields.length > 0 && (
                  <div className="mt-2">
                    <p className=" text-grey-400 text-sm">
                      Since you have{" "}
                      <span className="font-bold">{fields.length}</span> title
                      {fields.length > 1 && "s"} to test. We recommend the
                      following number of days.
                    </p>

                    <div className="flex gap-2">
                      {suggestNumTestDays(fields.length).map((num) => (
                        <div
                          key={num}
                          onClick={() =>
                            setValue(FormNames.DURATION, num as never)
                          } // TODO fix me
                          className={classNames(
                            "border w-20 text-center hover:cursor-pointer hover:bg-primary-50 px-2 py-1 rounded-md",
                            num === duration && "bg-primary-50"
                          )}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-grey-400 text-sm">
                  Test will complete on{" "}
                  <span className="font-bold text-grey-900">
                    {" "}
                    {dayjs()
                      .add(duration, "d")
                      .format("dddd, MMMM DD, YYYY")}{" "}
                  </span>
                </p>

                <p className="mt-4 text-grey-400 text-sm">
                  Final results will be available on
                  <span className="font-bold text-success">
                    {" "}
                    {dayjs()
                      .add(duration + 2, "d")
                      .format("dddd, MMMM DD, YYYY")}{" "}
                  </span>
                  because{" "}
                  <span className="text-red-500">Youtube Analytics</span> are
                  delayed 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <Button
            label="Create a test"
            buttonType="submit"
            // disabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};
export default CreateTestEditor;
