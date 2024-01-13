import React from "react";
import SummaryItem from "./SummaryItem";

const SummaryList = ({ summaries }) => {
  return (
    <div>
      {summaries.map((summary, index) => (
        <div key={index}>
          <div>
            <SummaryItem
              text={summary.text}
              icon={summary.icon}
              value={summary.value}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryList;
