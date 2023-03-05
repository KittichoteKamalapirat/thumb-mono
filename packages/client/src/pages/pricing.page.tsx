import { Helmet } from "react-helmet";
import LoggedOutNav from "../components/navbars/LoggedOutNav";

interface Props {}

const Pricing = ({}: Props) => {
  return (
    <div className="h-screen my-4">
      <LoggedOutNav />
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
          pricing-table-id="prctbl_1MiBrmI7tBOrSSsCHQxdUy7j"
          publishable-key="pk_test_51MiBBaI7tBOrSSsCFHWHZcQFxK3qoI8vrUVR9doM5uXUVQ9Sa7fSYOZCGBQZuDeE5qM7bGMB9FmGhzTGlpN9EcoV007Y4nPJSI"
        ></stripe-pricing-table>
        `,
          }}
        />
      </div>
    </div>
  );
};
export default Pricing;
