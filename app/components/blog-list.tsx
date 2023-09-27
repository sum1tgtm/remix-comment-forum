import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "./ui/card";

export const BlogList = () => {
  return (
    <Card>
      <CardHeader className="font-bold text-2xl">
        <div className="flex flex-row items-center gap-1">
          More from
          <Link to="/" className="text-primary">
            john doe
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
    </Card>
  );
};
