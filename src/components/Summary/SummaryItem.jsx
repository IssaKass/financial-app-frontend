import React from "react";

const SummaryItem = ({ icon, text, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-800/50">
      <div className="h-12 w-12">{icon}</div>
      <div>
        <p className="font-medium tracking-tight dark:text-white">{text}</p>
        <p className="mt-1 text-3xl font-bold text-primary-600">{value}</p>
      </div>
    </div>
  );
};

export default SummaryItem;
