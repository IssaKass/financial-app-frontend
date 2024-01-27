import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
import { CalendarCheck, DollarSign } from "lucide-react";
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
    <Page title="Financial | Subscriptions">
      <DashboardLayout>
        <Typography variant="h2" component="h2">
          Subscriptions
        </Typography>
        <div className="mt-6">
          <Tabs defaultValue="reports">
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
                  icon={<CalendarCheck />}
                />
                <SummaryItem
                  text="Total Price"
                  value={formatCurrency(
                    getTotalSubscriptionsPrice(subscriptions),
                  )}
                  icon={<DollarSign size={20} />}
                />
                <SummaryItem
                  text="Active Subscriptions Price"
                  value={formatCurrency(
                    getSubscriptionsPriceByActiveness(subscriptions, true),
                  )}
                  icon={<DollarSign size={20} />}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>{" "}
      </DashboardLayout>
    </Page>
  );
};

export default SubscriptionsPage;
