export function formatCurrency(amount = 0, currencyCode = "USD") {
  try {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);

    return formattedAmount;
  } catch (error) {
    console.error("Error formatting currency:", error);
    return amount; // Return the original amount in case of an error
  }
}

export const formatDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));

  return formattedDate;
};

export const formatSeconds = (seconds) => {
  if (!seconds || seconds === 0) {
    return "0s";
  }

  if (!isNaN(seconds) && !Number.isInteger(seconds)) {
    seconds = Math.round(seconds);
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  if (remainingSeconds > 0) {
    formattedTime += `${remainingSeconds}s`;
  }

  return formattedTime.trim();
};

export const formatDateToYYYYMMDD = (date) => {
  // Ensure the input is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Get year, month, and day components
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Concatenate components in the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
