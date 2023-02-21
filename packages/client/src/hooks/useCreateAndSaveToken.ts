import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import {
  Channel,
  useCreateAndSaveTokensMutation,
  User,
} from "../generated/graphql";

const GOOGLE_AUTH_CODE_REGEX = new RegExp("(?<=code=)(.*)(?=&scope)");

export const useCreateAndSaveToken = () => {
  const { setChannel } = useContext(ChannelContext);
  const { setUser } = useContext(UserContext);

  const [createAndSaveTokens] = useCreateAndSaveTokensMutation();
  const location = useLocation();

  useEffect(() => {
    const codes = location.search.match(GOOGLE_AUTH_CODE_REGEX);
    const code = codes?.[0];

    const createAndSaveTokenAsync = async () => {
      if (!code) return;
      console.log(2);
      const removePercentt2F = decodeURIComponent(code);
      const result = await createAndSaveTokens({
        variables: { code: removePercentt2F },
      });

      console.log("result", result);

      console.log(3);

      let errorMessage = "";
      const resultUserErrors = result.data?.createAndSaveTokens.errors || [];
      resultUserErrors.map(({ field, message }) => {
        errorMessage += `${field} ${message}\n`;
      });

      const { channel, user } = result.data?.createAndSaveTokens || {};

      console.log(4);
      if (user) {
        console.log(6);
        localStorage.setItem("user", JSON.stringify(user));
        setUser && setUser(user as User);
      }
      if (channel) {
        console.log(5);
        localStorage.setItem("channel", JSON.stringify(channel));

        setChannel && setChannel(channel as Channel);
      }
    };

    createAndSaveTokenAsync();
  }, [location]);
};
