import { createContext, Dispatch } from "react";
import { User } from "../generated/graphql";

export interface UserContext {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>> | null;
}

const initialValue = {
  user: null,
  setUser: null,
};
export const UserContext = createContext<UserContext>(initialValue);
