import SummaryItem from "./SummaryItem";

const SummaryList = ({ summaries }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {summaries.map((summary, index) => (
        <SummaryItem key={index} text={summary.text} value={summary.value} />
      ))}
    </div>
  );
};

export default SummaryList;
