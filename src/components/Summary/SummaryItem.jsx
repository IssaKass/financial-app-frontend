import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

const SummaryItem = ({ icon, text, value }) => {
  return (
    <Card>
      <CardContent className="relative py-4">
        <div className="absolute right-3 top-3 text-2xl text-muted-foreground">
          {icon}
        </div>
        <Typography variant="subtitle1" component="h3">
          {text}
        </Typography>
        <Typography
          variant="h3"
          component="span"
          className="mt-1 block text-primary"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryItem;
