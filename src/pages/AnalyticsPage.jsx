import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { fetchProjects } from "@/features/project/projectActions";
import Page from "@/layouts/Page";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";

const AnalyticsPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchProjects(userInfo.id));
    }
  }, [userInfo]);

  // const data = [
  //   getProjectsCountByStatus(projects, PROJECT_STATUS.PENDING),
  //   getProjectsCountByStatus(projects, PROJECT_STATUS.PROGRESS),
  //   getProjectsCountByStatus(projects, PROJECT_STATUS.FINISHED),
  // ];

  const data = [
    {
      revenue: 10400,
      subscription: 240,
    },
    {
      revenue: 14405,
      subscription: 300,
    },
    {
      revenue: 9400,
      subscription: 200,
    },
    {
      revenue: 8200,
      subscription: 278,
    },
    {
      revenue: 7000,
      subscription: 189,
    },
    {
      revenue: 9600,
      subscription: 239,
    },
    {
      revenue: 11244,
      subscription: 278,
    },
    {
      revenue: 26475,
      subscription: 189,
    },
  ];

  return (
    <Page title="Financial | Analytics">
      <DashboardLayout>
        <Typography variant="h2" component="h2">
          Analytics
        </Typography>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="h-[120px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="mt-6"
                >
                  <BarChart
                    data={data}
                    margin={{
                      top: 0,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <Bar
                      dataKey="subscription"
                      fill="var(--theme-primary)"
                      style={{
                        "--theme-primary": "hsl(var(--primary))",
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default AnalyticsPage;
