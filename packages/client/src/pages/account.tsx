import { useContext } from "react";
import Button from "../components/Buttons/Button";
import LabelAndData from "../components/LabelAndData";
import Layout from "../components/layouts/Layout";
import { ChannelContext, emptyChannel } from "../contexts/ChannelContext";
import { googleLogout } from "../firebase/client";
import { useMeQuery } from "../generated/graphql";

interface Props {}

const MyAccount = ({}: Props) => {
  const { channel, setChannel } = useContext(ChannelContext);

  const { data, loading, error } = useMeQuery();

  console.log("loadingggggg", loading);

  const handleLogout = async () => {
    const result = await googleLogout(channel.channelId);
    console.log("result", result);

    localStorage.clear();
    setChannel(emptyChannel);
  };

  return (
    <Layout>
      <LabelAndData data={channel.channelId.slice(0, 4)} label="Channel Id: " />

      {channel.channelId ? (
        <Button label="logout" onClick={handleLogout} />
      ) : null}
    </Layout>
  );
};
export default MyAccount;
