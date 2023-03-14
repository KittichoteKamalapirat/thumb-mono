import { ReactNode, useContext, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { RiCopperDiamondLine } from "react-icons/ri";
import { TbTestPipe } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { brandName, ICON_SIZE } from "../../constants";
import { ChannelContext } from "../../contexts/ChannelContext";
import { UserContext } from "../../contexts/UserContext";
import {
  useLogoutMutation,
  useMeUserQuery,
  User,
} from "../../generated/graphql";
import { urlResolver } from "../../lib/UrlResolver";
import { PRODUCT_NAME } from "../../types/ProductName.type";

import { Error } from "../skeletons/Error";
import { Loading } from "../skeletons/Loading";
import Badge from "../Badge";
import Button from "../../design-system/lib/Button/Button";

interface Props {
  children: ReactNode;
}

const SideAndTopNav = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { setChannel } = useContext(ChannelContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { data, loading, error } = useMeUserQuery();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const result = await logout();

      console.log("logout result", result);
      localStorage.clear();
      setChannel && setChannel(null);
      setUser && setUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const productName = data?.meUser?.customer?.subscription?.product.name;

  useEffect(() => {
    const user = data?.meUser;
    if (user && setUser) setUser(user as User);
  }, [data?.meUser]);

  if (loading) return <Loading isFullPage />;
  if (error) return <Error text="Error retrieving a user" />;

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-grey-200 dark:bg-grey-800 dark:border-grey-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-grey-500 rounded-lg md:hidden hover:bg-grey-100 focus:outline-none focus:ring-2 focus:ring-grey-200 dark:text-grey-400 dark:hover:bg-grey-700 dark:focus:ring-grey-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  {brandName}
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-grey-800 rounded-full focus:ring-4 focus:ring-grey-300 dark:focus:ring-grey-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>

                    <Badge content={productName || "No info"} />

                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-grey-100 rounded shadow dark:bg-grey-700 dark:divide-grey-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-grey-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-grey-900 truncate dark:text-grey-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-grey-700 hover:bg-grey-100 dark:text-grey-300 dark:hover:bg-grey-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-grey-700 hover:bg-grey-100 dark:text-grey-300 dark:hover:bg-grey-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-grey-700 hover:bg-grey-100 dark:text-grey-300 dark:hover:bg-grey-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-grey-200 sm:translate-x-0 dark:bg-grey-800 dark:border-grey-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-grey-800 flex flex-col justify-between">
          <ul className="space-y-2">
            <li>
              <Button
                leftIcon={BiPlus}
                label="Create AB Tests"
                onClick={() => navigate(urlResolver.createTest())}
              />
            </li>
            {/* <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-grey-900 rounded-lg dark:text-white hover:bg-grey-100 dark:hover:bg-grey-700"
              >
                <MdOutlineSpaceDashboard size={ICON_SIZE + 5} />
                <span className="ml-3">Dashboard</span>
              </a>
            </li> */}
            <li>
              <Link
                to={urlResolver.index()}
                className="flex items-center p-2 text-base font-normal text-grey-900 rounded-lg dark:text-white hover:bg-grey-100 dark:hover:bg-grey-700"
              >
                <TbTestPipe size={ICON_SIZE + 5} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Manage Tests
                </span>
              </Link>
            </li>
            {/* <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-grey-900 rounded-lg dark:text-white hover:bg-grey-100 dark:hover:bg-grey-700"
              >
                <MdOutlineNotificationsNone size={ICON_SIZE + 6} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Notifications
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  0
                </span>
              </a>
            </li> */}
          </ul>

          <ul className="pt-4 mt-4 space-y-2 border-t border-grey-200 dark:border-grey-700">
            {user?.membership === "basic" && (
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-grey-900 transition duration-75 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-700 dark:text-white group"
                >
                  <RiCopperDiamondLine size={ICON_SIZE + 6} />
                  <span className="ml-4">Upgrade to Pro</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-grey-800 bg-grey-200 rounded-full dark:bg-grey-700 dark:text-grey-300">
                    Pro
                  </span>
                </a>
              </li>
            )}

            <li>
              <Link
                to={urlResolver.myAccount()}
                className="flex items-center p-2 text-base font-normal text-grey-900 transition duration-75 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-700 dark:text-white group"
              >
                <MdAccountCircle size={ICON_SIZE + 5} />
                <span className="ml-3">My Account</span>
              </Link>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-normal text-grey-900 transition duration-75 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-700 dark:text-white group"
              >
                <FiLogOut size={ICON_SIZE + 5} />

                <span className="ml-3">Sign out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4  mt-14">{children}</div>
      </div>
    </div>
  );
};

export default SideAndTopNav;
