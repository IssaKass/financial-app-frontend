import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
import ProjectTable from "../components/Project/ProjectTable";
import DashboardLayout from "../layouts/DashboardLayout";

const ProjectsListPage = () => {
  return (
    <Page title="Financial | Projects">
      <DashboardLayout>
        <Typography variant="h2" className="mt-4 text-center">
          AKA STUDIO
        </Typography>
        <div className="mt-6">
          <ProjectTable />
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default ProjectsListPage;
