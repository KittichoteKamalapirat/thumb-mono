import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

import { SummaryItem } from "../pages/testing";
import { firebaseConfig } from "./config";
import { Testing } from "./types/Testing.type";
import { createFunction } from "./utils/createFunction";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, "us-central1");

// connectFirestoreEmulator(firestore, "localhost", 8080); // remove this line when using cloud firestore
// connectStorageEmulator(storage, "localhost", 9199);
// connectFunctionsEmulator(functions, "localhost", 5001);

export const googleLogout = createFunction<string, boolean>("googleLogout");
export const getStatsOneVid = createFunction<Testing, SummaryItem[] | null>(
  "getStatsOneVid"
);
export const getAuthURLCall = createFunction<null, string>("getAuthURLCall");

export const createAndSaveTokens = createFunction<
  string,
  { channelId: string }
>("createAndSaveTokens");
