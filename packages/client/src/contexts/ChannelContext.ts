import { createContext, Dispatch } from "react";
import { Channel } from "../generated/graphql";

export interface ChannelContext {
  channel: Channel | null;
  setChannel: Dispatch<React.SetStateAction<Channel | null> | null>;
}

const initialValue = {
  channel: null,
  setChannel: null,
};
export const ChannelContext = createContext<ChannelContext>(initialValue);
