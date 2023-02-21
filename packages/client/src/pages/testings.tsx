import dayjs from "dayjs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "../components/Buttons/Button";
import LabelAndData from "../components/LabelAndData";
import Layout from "../components/layouts/Layout";
import PageHeading from "../components/typography/PageHeading";
import { useMyTestingsQuery } from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { primaryColor } from "../theme";

interface Props {}

const Testings = ({}: Props) => {
  const { data, loading, error } = useMyTestingsQuery();

  const testings = data?.myTestings;

  console.log("data", data);
  console.log("testings", testings);

  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading heading="Manage AB Tests" />

        <Button label="Create AB Tests" href="/create-test" />
      </div>
      {testings?.map((testing) => (
        <div className="border p-4 rounded-md my-4">
          <div className="flex gap-1">
            <HiOutlineExternalLink color={primaryColor} />
            <a
              href={`https://www.youtube.com/watch?v=${testing.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on Youtube
            </a>
          </div>

          <Link
            data-note="link"
            to={urlResolver.myTest(testing.id)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LabelAndData label="Duration" data={String(testing?.duration)} />
            <LabelAndData
              label="Duration Type"
              data={String(testing?.durationType)}
            />
            <LabelAndData label="Status" data={String(testing?.status)} />
            <LabelAndData
              label="Start Date"
              data={dayjs(testing?.startDate).format("MMMM D, YYYY")}
            />

            {testing.type === "thumb" && (
              <div className="grid grid-cols-2 gap-2">
                <img src={testing.ori} className="w-full col-span-1" />
                {testing.varis.map((vari) => (
                  <img src={vari} className="w-full  col-span-1" />
                ))}
              </div>
            )}
          </Link>
        </div>
      ))}
    </Layout>
  );
};
export default Testings;
