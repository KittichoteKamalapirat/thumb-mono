import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "./client";
import { CreateTestInput } from "./types/Testing.type";

export const createTesting = async (
  channelId: string,
  input: CreateTestInput
): Promise<string> => {
  const id = uuidv4();

  const docRef = doc(firestore, "channels", channelId, "testings", id);

  try {
    const params = {
      id,
      channelId,
      status: "ongoing",
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      history: [],
      ...input,
    };

    // if add doc (but id won't be the same as key)
    // const colRef = collection(firestore, "channels", channelId, "testings");
    // await addDoc(colRef, input);
    await setDoc(docRef, params);

    return id;
  } catch (error) {
    console.log("error inside create testing", error);
    return "";
  }
};
