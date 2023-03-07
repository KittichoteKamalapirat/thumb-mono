import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Button";
import LabelAndData from "../components/LabelAndData";
import Layout from "../components/layouts/Layout";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import {
  useCreateBillingPortalUrlMutation,
  useLogoutMutation,
} from "../generated/graphql";

interface Props {}

const MyAccount = ({}: Props) => {
  const { channel, setChannel } = useContext(ChannelContext);
  const { user, setUser } = useContext(UserContext);
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  const [createPortal] = useCreateBillingPortalUrlMutation();

  const [logout] = useLogoutMutation();

  const handleCreatePortal = async () => {
    const result = await createPortal();

    console.log("result creating portal", result);
    const resultValue = result.data?.createBillingPortalUrl;

    let errorMessage = "";
    const resultUserErrors = result.data?.createBillingPortalUrl.errors || [];
    resultUserErrors.map(({ field, message }) => {
      errorMessage += `${field} ${message}\n`;
    });

    if (resultValue && resultUserErrors.length === 0) {
      const portalUrl = resultValue.value;
      portalUrl && window.location.replace(portalUrl);
      return null;
      // dispatch(
      //   showToast({
      //     message: "Availability successfully updated",
      //     variant: "success",
      //   })
      // );
    } else {
      // dispatch(
      //   showToast({
      //     message: errorMessage,
      //     variant: "error",
      //   })
      // );
    }
  };

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

      <Button label="Manage Subscription" onClick={handleCreatePortal} />

      {channel?.ytChannelId ? (
        <Button label="logout" onClick={handleLogout} />
      ) : null}
    </Layout>
  );
};
export default MyAccount;
