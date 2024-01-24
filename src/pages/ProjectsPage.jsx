import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import {
  PiBriefcaseBold,
  PiCurrencyCircleDollarBold,
  PiImageBold,
  PiTimerBold,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import ProjectTable from "../components/Project/ProjectTable";
import SummaryItem from "../components/Summary/SummaryItem";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getTotalAnimationDuration,
  getTotalBudget,
  getTotalImagesCount,
  getTotalProjectsCount,
} from "../utils/ProjectHelpers";
import { formatCurrency, formatSeconds } from "../utils/format";

const ProjectsPage = () => {
  const { data: projects } = useSelector((state) => state.projects);

  return (
    <DashboardLayout>
      <Typography variant="h2" component="h2">
        Projects
      </Typography>
      <div className="mt-6">
        {" "}
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
            <ProjectTable />
          </TabsContent>
          <TabsContent value="overview">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SummaryItem
                text="Total Projects"
                value={getTotalProjectsCount(projects)}
                icon={<PiBriefcaseBold />}
              />
              <SummaryItem
                text="Total Images"
                value={getTotalImagesCount(projects)}
                icon={<PiImageBold />}
              />
              <SummaryItem
                text="Total Budget"
                value={formatCurrency(getTotalBudget(projects))}
                icon={<PiCurrencyCircleDollarBold />}
              />
              <SummaryItem
                text="Total Animation"
                value={formatSeconds(getTotalAnimationDuration(projects))}
                icon={<PiTimerBold />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
