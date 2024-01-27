import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
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

import { DollarSign, FolderDot, Image, Timer } from "lucide-react";
const ProjectsPage = () => {
  const { data: projects } = useSelector((state) => state.projects);

  return (
    <Page title="Financial | Projects">
      <DashboardLayout>
        <Typography variant="h2" component="h2">
          Projects
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
              <ProjectTable />
            </TabsContent>
            <TabsContent value="overview">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <SummaryItem
                  text="Total Projects"
                  value={getTotalProjectsCount(projects)}
                  icon={<FolderDot size={88} />}
                />
                <SummaryItem
                  text="Total Images"
                  value={getTotalImagesCount(projects)}
                  icon={<Image size={88} />}
                />
                <SummaryItem
                  text="Total Budget"
                  value={formatCurrency(getTotalBudget(projects))}
                  icon={<DollarSign size={88} />}
                />
                <SummaryItem
                  text="Total Animation"
                  value={formatSeconds(getTotalAnimationDuration(projects))}
                  icon={<Timer size={88} />}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default ProjectsPage;
