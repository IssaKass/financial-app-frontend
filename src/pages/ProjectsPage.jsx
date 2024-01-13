import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectTable from "../components/Project/ProjectTable";
import {
  getTotalAnimationDuration,
  getTotalBudget,
  getTotalImagesCount,
  getTotalProjectsCount,
} from "../utils/ProjectHelpers";
import { formatCurrency, formatSeconds } from "../utils/format";
import { useSelector } from "react-redux";
import SummaryItem from "../components/Summary/SummaryItem";
import BriefcaseIcon from "@heroicons/react/20/solid/BriefcaseIcon";
import PhotoIcon from "@heroicons/react/20/solid/PhotoIcon";
import CurrencyDollarIcon from "@heroicons/react/20/solid/CurrencyDollarIcon";

const ProjectsPage = () => {
  const { data: projects } = useSelector((state) => state.projects);

  return (
    <DashboardLayout>
      <div className="mx-auto grid max-w-[80rem] gap-4">
        <div className="grid max-w-[80rem] gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryItem
            text="Total Projects"
            value={getTotalProjectsCount(projects)}
            icon={<BriefcaseIcon className="fill-primary-600" />}
          />
          <SummaryItem
            text="Total Images"
            value={getTotalImagesCount(projects)}
            icon={<PhotoIcon className="fill-primary-600" />}
          />
          <SummaryItem
            text="Total Budget"
            value={formatCurrency(getTotalBudget(projects))}
            icon={<CurrencyDollarIcon className="fill-primary-600" />}
          />
          <SummaryItem
            text="Total Animation"
            value={formatSeconds(getTotalAnimationDuration(projects))}
            icon={<CurrencyDollarIcon className="fill-primary-600" />}
          />
        </div>
        <ProjectTable />
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
