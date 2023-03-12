import dayjs from "dayjs";
import { useContext } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useParams } from "react-router-dom";
import LabelAndData from "../components/LabelAndData";
import Layout from "../components/layouts/Layout";
import TestingItem from "../components/TestingItem";
import PageHeading from "../components/typography/PageHeading";
import { ChannelContext } from "../contexts/ChannelContext";
import { useStatsQuery, useTestingQuery } from "../generated/graphql";

import { primaryColor } from "../theme";

interface Props {}

export interface ResultForEachThumbnail {
  views: number;
  annotationClickThroughRate: number;
  annotationCloseRate: number;
  annotationClickableImpressions: number;
  averageViewDuration: number;
  comments: number;
  dislikes: number;
  estimatedMinutesWatched: number;
  likes: number;
  shares: number;
  subscribersGained: number;
  subscribersLost: number;
}

const blank = {
  views: 0,
  annotationClickThroughRate: 0,
  annotationCloseRate: 0,
  annotationClickableImpressions: 0,
  averageViewDuration: 0,
  comments: 0,
  dislikes: 0,
  estimatedMinutesWatched: 0,
  likes: 0,
  shares: 0,
  subscribersGained: 0,
  subscribersLost: 0,
};

const MyTesting = ({}: Props) => {
  const { id } = useParams();
  const { channel, setChannel } = useContext(ChannelContext);
  const channelId = channel?.ytChannelId;

  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useStatsQuery({
    variables: { testingId: id || "" },
  });

  const summary = statsData?.stats;

  // const [testing, setTesting] = useState<Testing | null>(null);

  const { data, loading, error } = useTestingQuery({
    variables: { id: id || "" },
  });

  console.log("stats", statsData);

  const testing = data?.testing;

  const params = useParams();

  // useEffect(() => {
  //   const handleSummary = async () => {
  //     console.log("channel id", channelId);
  //     console.log("testing?.videoId", testing?.videoId);

  //     if (!testing || !channelId) return;
  //     const summary = await getStatsOneVid(testing as any); // TODO fix me
  //     console.log("resulttt", result);

  //     if (!summary) return; // TODO
  //     setSummary(summary);
  //   };
  //   console.log("handle summary 1 ");

  //   handleSummary();
  //   console.log("handle summary 2 ");
  // }, [testing, channelId]);

  if (loading || statsLoading) return <div>loading</div>;
  if (error || statsError)
    return <div>{error?.message || statsError?.message}</div>;

  if (!testing) return <div>no testing</div>;

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading heading="AB Test Status" />
      </div>

      <TestingItem testing={testing} />

      <div data-note="table">
        <div className="grid grid-cols-6">
          <div className="col-span-1">ThumbUrl</div>
          <div className="col-span-1">CTR</div>
          <div className="col-span-1">AVD</div>
          <div className="col-span-1">Impression</div>

          <div className="col-span-1">New Subs</div>
          <div className="col-span-1">Views</div>
        </div>

        {summary?.map((thumbResult) => (
          <div data-note="row" className="grid grid-cols-6">
            <div className="col-span-1"> {thumbResult.subject}</div>
            <div className="col-span-1">
              {thumbResult.annotationClickThroughRate}
            </div>

            <div className="col-span-1">{thumbResult.averageViewDuration}</div>
            <div className="col-span-1">
              {thumbResult.annotationClickableImpressions}
            </div>
            <div className="col-span-1">{thumbResult.subscribersGained}</div>
            <div className="col-span-1">{thumbResult.views}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default MyTesting;
