import { useContext } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layouts/Layout";
import LoggedOutNav from "../components/navbars/LoggedOutNav";
import { UserContext } from "../contexts/UserContext";

const Pricing = () => {
  const { user } = useContext(UserContext);

  console.log(
    "import.meta.env.STRIPE_API_PRICING_TABLE_ID",
    import.meta.env.VITE_STRIPE_API_PUBLISHABLE
  );

  if (!user?.id) {
    return <div>show pricing table with login buttons</div>;
  }

  console.log("user", user);

  return (
    <div className="h-screen my-4">
      <Layout>
        <div className="block">
          <Helmet>
            <script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
            ></script>
          </Helmet>

          <div
            dangerouslySetInnerHTML={{
              __html: `
          <stripe-pricing-table
          pricing-table-id="${import.meta.env.VITE_STRIPE_API_PRICING_TABLE_ID}"
          publishable-key="${import.meta.env.VITE_STRIPE_API_PUBLISHABLE}"
          client-reference-id=${user.id}
        ></stripe-pricing-table>
        `,
            }}
          />
        </div>
      </Layout>
    </div>
  );
};
export default Pricing;
