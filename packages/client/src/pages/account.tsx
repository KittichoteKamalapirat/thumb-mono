import { useContext } from "react";
import Button from "../components/Buttons/Button";
import LabelAndData from "../components/LabelAndData";
import Layout from "../components/layouts/Layout";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import { useLogoutMutation } from "../generated/graphql";

interface Props {}

const MyAccount = ({}: Props) => {
  const { channel, setChannel } = useContext(ChannelContext);
  const { user, setUser } = useContext(UserContext);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setChannel && setChannel(null);
      setUser && setUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Layout>
      <LabelAndData
        data={channel?.ytChannelId.slice(0, 4) || ""}
        label="Channel Id: "
      />

      {channel?.ytChannelId ? (
        <Button label="logout" onClick={handleLogout} />
      ) : null}
    </Layout>
  );
};
export default MyAccount;
