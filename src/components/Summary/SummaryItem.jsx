import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

const SummaryItem = ({ icon, text, value }) => {
  return (
    <Card className="relative grid h-28 place-items-center overflow-hidden">
      <div className="relative text-center">
        <Typography variant="subtitle1" component="h3">
          {text}
        </Typography>
        <Typography variant="h3" component="span">
          {value}
        </Typography>
      </div>
    </Card>
  );
};

export default SummaryItem;
