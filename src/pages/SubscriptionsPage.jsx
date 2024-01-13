import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SubscriptionTable from "../components/Subscription/SubscriptionTable";
import SummaryItem from "../components/Summary/SummaryItem";
import { useSelector } from "react-redux";
import {
  getSubscriptionsPriceByActivness,
  getTotalSubscriptionsCount,
  getTotalSubscriptionsPrice,
} from "../utils/SubscriptionHelpers";
import CurrencyDollarIcon from "@heroicons/react/20/solid/CurrencyDollarIcon";
import CalendarIcon from "@heroicons/react/20/solid/CalendarIcon";
import { formatCurrency } from "../utils/format";

const SubscriptionsPage = () => {
  const { data: subscriptions } = useSelector((state) => state.subscriptions);

  return (
    <DashboardLayout>
      <div className="mx-auto grid max-w-[80rem] gap-4">
        <div className="grid max-w-[80rem] gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryItem
            text="Total Subscriptions"
            value={getTotalSubscriptionsCount(subscriptions)}
            icon={<CalendarIcon className="fill-primary-600" />}
          />
          <SummaryItem
            text="Total Price"
            value={formatCurrency(getTotalSubscriptionsPrice(subscriptions))}
            icon={<CurrencyDollarIcon className="fill-primary-600" />}
          />
          <SummaryItem
            text="Active Subscriptions Price"
            value={formatCurrency(
              getSubscriptionsPriceByActivness(subscriptions, true),
            )}
            icon={<CurrencyDollarIcon className="fill-primary-600" />}
          />
        </div>
        <SubscriptionTable />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;
