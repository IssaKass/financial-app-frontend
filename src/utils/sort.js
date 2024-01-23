export const sortByStatus = (statusA, statusB, statusSortOrder) => {
  const indexA = statusSortOrder.indexOf(statusA);
  const indexB = statusSortOrder.indexOf(statusB);

  return indexA > indexB ? 1 : indexA < indexB ? -1 : 0;
};

export const sortByDate = (a, b) => {
  return new Date(a) - new Date(b);
};
