import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { Error } from "../components/skeletons/Error";
import { Loading } from "../components/skeletons/Loading";
import TestingItem from "../components/TestingItem";
import PageHeading from "../components/typography/PageHeading";
import Button from "../design-system/lib/Button/Button";
import { useMyTestingsQuery } from "../generated/graphql";

interface Props {}

const Testings = ({}: Props) => {
  const { data, loading, error } = useMyTestingsQuery();
  const navigate = useNavigate();

  const testings = data?.myTestings;

  console.log("data", data);
  console.log("testings", testings);

  if (loading) return <Loading isFullPage />;
  if (error) return <Error text={error.message} />;

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading heading="Manage AB Tests" />

        <Button
          label="Create AB Tests"
          onClick={() => navigate("/create-test")}
        />
      </div>
      {testings?.map((testing) => (
        <TestingItem testing={testing} />
      ))}
    </Layout>
  );
};
export default Testings;
