import { Card, CardContent } from "@/components/ui/card";

const SummaryItem = ({ icon, text, value }) => {
  return (
    <Card className="relative">
      <div className="absolute right-3 top-3 text-2xl text-muted-foreground">
        {icon}
      </div>
      <CardContent className="pt-4">
        <p className="text-sm">{text}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryItem;
