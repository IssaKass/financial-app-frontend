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
      <div className="grid gap-4">
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
        <ProjectTable />
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
