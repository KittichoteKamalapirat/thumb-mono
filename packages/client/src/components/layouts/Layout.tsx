import { ReactNode, useContext } from "react";
import { ChannelContext } from "../../contexts/ChannelContext";
import Container from "../containers/Container";
import { Footer } from "../Footer";
import LoggedInNav from "../navbars/LoggedInNav";
import LoggedOutNav from "../navbars/LoggedOutNav";
import SideAndTopNav from "../navbars/SideAndTopNav";

interface Props {
  children: ReactNode;
  justifyContent?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
  alignItems?:
    | ""
    | "items-start"
    | "items-end"
    | "items-center"
    | "items-baseline"
    | "items-stretch";
  extraStyle?: string;
}
const Layout = ({
  children,
  justifyContent = "justify-center",
  alignItems = "",
  extraStyle = "",
}: Props) => {
  const { channel } = useContext(ChannelContext);
  const { channelId } = channel;

  if (channelId) return <SideAndTopNav>{children}</SideAndTopNav>;
  return (
    <div>
      <LoggedOutNav />
      <div className="bg-grey-0 text-grey-900 h-min-screen ">
        <main
          className={`flex-1 h-full w-full ${justifyContent} ${alignItems} ${extraStyle} `}
        >
          <Container>{children}</Container>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
