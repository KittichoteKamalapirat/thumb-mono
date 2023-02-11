import { SelectOption } from "../../components/forms/CheckboxField";

const DurationTypes = ["specific", "stats_significant"] as const;
export type DurationType = typeof DurationTypes[number];

// ------------------------------------------------------------

export const TestingTypeObj = {
  thumb: "Thumbnail",
  title: "Title",
} as const;

export type TestingType = keyof typeof TestingTypeObj;

export const testingTypeOptions: SelectOption[] = Object.keys(
  TestingTypeObj
).map((key) => ({
  value: key as TestingType,
  label: TestingTypeObj[key as TestingType],
}));

// ------------------------------------------------------------

const TestingStatuses = ["ongoing", "complete"] as const;
export type TestingStatus = typeof TestingStatuses[number];

export interface TestHistory {
  date: string; // see YOUTUBE_DATA_API_DATE_FORMAT
  value: string;
}

export interface Testing {
  id: string;
  channelId: string; // as userId
  videoId: string;
  durationType: DurationType;
  duration: number; // days
  type: TestingType;
  status: TestingStatus; // if complete => has result
  startDate: string;
  createdAt: string; // timezone in utc and format in iso

  history: TestHistory[];
  ori: string; // title or url
  varis: { value: string }[]; // title or url
}

export type CreateTestInput = {
  type: TestingType;
  videoId: string;
  duration: number;
  durationType: "specific";
  ori: string;
  varis: { value: string }[];
};
