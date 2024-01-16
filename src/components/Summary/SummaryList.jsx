import React from "react";
import SummaryItem from "./SummaryItem";

const SummaryList = ({ summaries }) => {
  return (
    <div>
      {summaries.map((summary, index) => (
        <SummaryItem
          key={index}
          text={summary.text}
          icon={summary.icon}
          value={summary.value}
        />
      ))}
    </div>
  );
};

export default SummaryList;
