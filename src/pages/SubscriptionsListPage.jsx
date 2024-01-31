import SummaryList from "@/components/Summary/SummaryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
import { CalendarCheck, DollarSign } from "lucide-react";
import { useSelector } from "react-redux";
import SubscriptionTable from "../components/Subscription/SubscriptionTable";
import { selectAllSubscriptions } from "../features/subscriptions/subscriptionsSlice";
import DashboardLayout from "../layouts/DashboardLayout";
import { getSubscriptionsPriceByActiveness, getTotalSubscriptionsCount, getTotalSubscriptionsPrice } from "../utils/SubscriptionHelpers";
import { formatCurrency } from "../utils/format";
const SubscriptionsListPage = () => {
  const { userInfo } = useSelector((state) => state.user)
  const subscriptions = useSelector(selectAllSubscriptions);

  console.log(subscriptions);

  const summaries = [
    {
      text: "Total Subscriptions",
      value: getTotalSubscriptionsCount(subscriptions),
      icon: <CalendarCheck size={88} />,
    },
    {
      text: "Total Price",
      value: formatCurrency(getTotalSubscriptionsPrice(subscriptions)),
      icon: <DollarSign size={88} />,
    },
    {
      text: "Active Subscriptions Price",
      value: formatCurrency(
        getSubscriptionsPriceByActiveness(subscriptions, true),
      ),
      icon: <DollarSign size={88} />,
    },
  ];

  return (
    <Page title="Financial | Subscriptions">
      <DashboardLayout>
        <Typography variant="h2" className="mt-4 text-center">
          {userInfo.company}
        </Typography>
        <div className="mt-6">
          <Tabs defaultValue="reports" className="mt-4">
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
              <SummaryList summaries={summaries} />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default SubscriptionsListPage;
