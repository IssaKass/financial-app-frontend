import React from "react";
import {
  PiBriefcaseBold,
  PiCurrencyCircleDollarBold,
  PiImageBold,
  PiTimerBold
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
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <SummaryItem
            text="Total Projects"
            value={getTotalProjectsCount(projects)}
            icon={<PiBriefcaseBold className="h-10 w-10 fill-primary-600" />}
          />
          <SummaryItem
            text="Total Images"
            value={getTotalImagesCount(projects)}
            icon={<PiImageBold className="h-10 w-10 fill-primary-600" />}
          />
          <SummaryItem
            text="Total Budget"
            value={formatCurrency(getTotalBudget(projects))}
            icon={
              <PiCurrencyCircleDollarBold className="h-10 w-10 fill-primary-600" />
            }
          />
          <SummaryItem
            text="Total Animation"
            value={formatSeconds(getTotalAnimationDuration(projects))}
            icon={<PiTimerBold className="h-10 w-10 fill-primary-600" />}
          />
        </div>
        <ProjectTable />
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
