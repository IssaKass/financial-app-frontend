import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <h1 className="text-3xl font-extrabold">Subscriptions</h1>
      <Tabs defaultValue="reports" className="mt-6">
        <TabsList className="mb-2">
          <TabsTrigger value="reports" className="w-28">
            Reports
          </TabsTrigger>
          <TabsTrigger value="overview" className="w-28">
            Overview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reports">
          <SubscriptionTable />
        </TabsContent>
        <TabsContent value="overview">
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;
