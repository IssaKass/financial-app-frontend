import React, { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../features/project/projectActions";
import { getProjectsCountByStatus } from "../utils/ProjectHelpers";
import { PROJECT_STATUS } from "../utils/constants";
import colors from "tailwindcss/colors";

const AnalyticsPage = () => {
  const { data: projects } = useSelector((state) => state.projects);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchProjects(userInfo.id));
    }
  }, [userInfo]);

  const chartConfig = {
    type: "pie",
    width: 400,
    height: 400,
    series: [
      getProjectsCountByStatus(projects, PROJECT_STATUS.PENDING),
      getProjectsCountByStatus(projects, PROJECT_STATUS.PROGRESS),
      getProjectsCountByStatus(projects, PROJECT_STATUS.FINISHED),
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      labels: ["Pending", "Progress", "Finished"],
      dataLabels: {
        enabled: false,
      },
      colors: [colors.red[600], colors.yellow[600], colors.green[600]],
      legend: {
        show: true,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
        <Chart {...chartConfig} />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
