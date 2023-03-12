import dayjs from "dayjs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../design-system/lib/Button/Button";
import { MyTestingsQuery } from "../generated/graphql";
import { urlResolver } from "../lib/UrlResolver";
import { primaryColor } from "../theme";
import Badge from "./Badge";

import LinkButton from "./Buttons/LinkButton";
import LabelAndData from "./LabelAndData";
import YoutubeThumbnailItem from "./YoutubeThumbnailItem";

type TestingsQueryTesting = MyTestingsQuery["myTestings"][number];
interface Props {
  testing: TestingsQueryTesting;
}

const TestingItem = ({ testing }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 border p-4 rounded-md my-4">
      {/* left */}
      <div className="col-span-4">
        <div>
          <YoutubeThumbnailItem
            thumbUrl={testing.videoThumbUrl}
            title={testing.videoTitle}
          />

          <LinkButton
            href={`https://www.youtube.com/watch?v=${testing.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              label="Watch on Youtube"
              type="TEXT"
              size="SMALL"
              leftIcon={HiOutlineExternalLink}
            />
          </LinkButton>
        </div>
      </div>
      {/* right */}
      <div className="col-span-8">
        <Link
          data-note="link"
          to={urlResolver.myTest(testing.id)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LabelAndData label="Type" data={String(testing.type)} />
          <LabelAndData label="Duration" data={String(testing?.duration)} />
          <LabelAndData
            label="Duration Type"
            data={String(testing?.durationType)}
          />

          <div className="flex gap-2">
            <p>Status</p>
            <Badge content={testing.status} />
          </div>

          <LabelAndData
            label="Start Date"
            data={dayjs(testing?.startDate).format("MMMM D, YYYY")}
          />

          {/* Thumbs */}
          <p className="font-bold">Test Subjects</p>

          {testing.type === "thumb" ? (
            <div className="flex gap-2">
              {testing.varis.map((vari) => (
                <img src={vari} className="w-20 " />
              ))}
            </div>
          ) : (
            <div>
              {testing.varis.map((vari) => (
                <p className="">{vari}</p>
              ))}
            </div>
          )}
        </Link>

        <LinkButton href={urlResolver.myTest(testing.id)} className="mt-4">
          <Button label="See Test Details" type="TERTIARY" />
        </LinkButton>
      </div>
    </div>
  );
};
export default TestingItem;
