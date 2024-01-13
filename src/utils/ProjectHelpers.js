import "../prototypes/array";

export const getTotalProjectsCount = (projects) => {
  return projects.length;
};

export const getTotalBudget = (projects) => {
  return projects.map((project) => Number(project.budget)).sum();
};

export const getTotalImagesCount = (projects) => {
  return projects.map((project) => Number(project.images)).sum();
};

export const getTotalAnimationDuration = (projects) => {
  return projects.map((project) => Number(project.animation)).sum();
};

export const getProjectsCountByStatus = (projects, status) => {
  return projects.filter((project) => project.status === status).length;
};

export const getAverageBudgetPerProject = (projects) => {
  return projects ? projects.map((project) => Number(project.budget)).avg() : 0;
};

export const getHighestBudgetProject = (projects) => {
  return projects.map((project) => Number(project.budget)).max();
};

export const getLowestBudgetProject = (projects) => {
  return projects.map((project) => Number(project.budget)).min();
};

export const getNumberProjectsExceedingBudget = (projects) => {
  return projects
    .map((project) => Number(project.budget))
    .filter((budget) => budget >= getAverageBudgetPerProject()).length;
};

export const getAverageImagesPerProject = (projects) => {
  return Math.round(projects.map((project) => Number(project.images)).avg());
};

export const getAverageAnimationPerProject = (projects) => {
  return projects.map((project) => Number(project.animation)).avg();
};

export const getNumberProjectsWithAnimation = (projects) => {
  return projects.filter((project) => Number(project.animation) > 0).length;
};

export const getNumberProjectsWithoutAnimation = (projects) => {
  return projects.filter((project) => Number(project.animation) === 0).length;
};
