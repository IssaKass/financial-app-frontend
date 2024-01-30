import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
import { useSelector } from "react-redux";
import ProjectTable from "../components/Project/ProjectTable";
import DashboardLayout from "../layouts/DashboardLayout";

const ProjectsListPage = () => {
  const { userInfo } = useSelector((state) => state.user)
  return (
    <Page title="Financial | Projects">
      <DashboardLayout>
        <Typography variant="h2" className="mt-4 text-center">
          {userInfo.company}
        </Typography>
        <div className="mt-6">
          <ProjectTable />
        </div>
      </DashboardLayout>
    </Page>
  );
};

export default ProjectsListPage;
