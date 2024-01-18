import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import colors from "tailwindcss/colors";
import { useTheme } from "../contexts/ThemeContext";
import { fetchProjects } from "../features/project/projectActions";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProjectsCountByStatus } from "../utils/ProjectHelpers";
import { PROJECT_STATUS } from "../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const { isDarkMode } = useTheme();
  const { data: projects } = useSelector((state) => state.projects);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchProjects(userInfo.id));
    }
  }, [userInfo]);

  const data = [
    getProjectsCountByStatus(projects, PROJECT_STATUS.PENDING),
    getProjectsCountByStatus(projects, PROJECT_STATUS.PROGRESS),
    getProjectsCountByStatus(projects, PROJECT_STATUS.FINISHED),
  ];

  return (
    <DashboardLayout>
      <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
        <h3 className="text-lg font-bold">Projects by status</h3>
        <div className="relative mt-4 h-80 w-full">
          <Pie
            width={100}
            height={100}
            data={{
              labels: [
                PROJECT_STATUS.PENDING,
                PROJECT_STATUS.PROGRESS,
                PROJECT_STATUS.FINISHED,
              ],
              datasets: [
                {
                  label: "Projects",
                  data: data,
                  backgroundColor: [
                    isDarkMode ? colors.red[300] : colors.red[300],
                    isDarkMode ? colors.yellow[300] : colors.yellow[300],
                    isDarkMode ? colors.green[300] : colors.green[300],
                  ],
                  hoverBackgroundColor: [
                    isDarkMode ? colors.red[200] : colors.red[200],
                    isDarkMode ? colors.yellow[200] : colors.yellow[200],
                    isDarkMode ? colors.green[200] : colors.green[200],
                  ],
                  borderColor: [
                    isDarkMode ? colors.red[500] : colors.red[500],
                    isDarkMode ? colors.yellow[500] : colors.yellow[500],
                    isDarkMode ? colors.green[500] : colors.green[500],
                  ],
                  borderWidth: 2,
                  borderDash: [0],
                  hoverBorderDash: [4],
                  offset: 12,
                  hoverOffset: 24,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
