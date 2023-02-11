import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { createAndSaveTokens } from "../firebase/client";
import { useCreateAndSaveTokensMutation } from "../generated/graphql";

const GOOGLE_AUTH_CODE_REGEX = new RegExp("(?<=code=)(.*)(?=&scope)");

export const useCreateAndSaveToken = () => {
  const { setChannel } = useContext(ChannelContext);

  const [createAndSaveTokens] = useCreateAndSaveTokensMutation();
  const location = useLocation();

  useEffect(() => {
    const codes = location.search.match(GOOGLE_AUTH_CODE_REGEX);
    const code = codes?.[0];

    const createAndSaveTokenAsync = async () => {
      console.log(1);

      if (!code) return;
      console.log(2);
      const removePercentt2F = decodeURIComponent(code);
      const result = await createAndSaveTokens({
        variables: { code: removePercentt2F },
      });
      console.log(3);

      const { channelId } = result.data?.createAndSaveTokens.channel || {};

      console.log(4);

      if (channelId) {
        console.log(5);
        localStorage.setItem("channelId", channelId);
        const channel = { channelId };
        setChannel(channel);
      }
    };

    createAndSaveTokenAsync();
  }, [location]);
};
