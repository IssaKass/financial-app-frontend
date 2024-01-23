import {
  PiCalendarBlankBold,
  PiCurrencyCircleDollarBold,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import SubscriptionTable from "../components/Subscription/SubscriptionTable";
import SummaryItem from "../components/Summary/SummaryItem";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getSubscriptionsPriceByActiveness,
  getTotalSubscriptionsCount,
  getTotalSubscriptionsPrice,
} from "../utils/SubscriptionHelpers";
import { formatCurrency } from "../utils/format";

const SubscriptionsPage = () => {
  const { data: subscriptions } = useSelector((state) => state.subscriptions);

  return (
    <DashboardLayout>
      <div className="mx-auto grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <SummaryItem
            text="Total Subscriptions"
            value={getTotalSubscriptionsCount(subscriptions)}
            icon={<PiCalendarBlankBold />}
          />
          <SummaryItem
            text="Total Price"
            value={formatCurrency(getTotalSubscriptionsPrice(subscriptions))}
            icon={<PiCurrencyCircleDollarBold />}
          />
          <SummaryItem
            text="Active Subscriptions Price"
            value={formatCurrency(
              getSubscriptionsPriceByActiveness(subscriptions, true),
            )}
            icon={<PiCurrencyCircleDollarBold />}
          />
        </div>
        <SubscriptionTable />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;
