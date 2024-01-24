import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h2" component="h2" className="mt-1">
          Page not found
        </Typography>
        <Typography className="mt-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </Typography>
        <div className="mt-10">
          <Button>
            <Link to="/" className="capitalize">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
