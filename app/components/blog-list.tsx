import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

export const BlogList = () => {
  const blogList = [
    "How to Easily Create New Mock Instances in Unit Tests",
    "Development Journey Pitfalls",
    "Top 10 JavaScript Libraries You Must Know",
  ];
  return (
    <Card className="w-[346px]">
      <CardHeader className="font-bold text-2xl py-3">
        <span className="flex flex-row items-center">
          More from &thinsp;
          <Link to="/" className="text-primary">
            john doe
          </Link>
        </span>
      </CardHeader>
      {blogList.map((blog, i) => (
        <div key={i}>
          <Separator />
          <CardContent className="py-3 hover:text-blue-700">
            <Link to="#">{blog}</Link>
          </CardContent>
        </div>
      ))}
    </Card>
  );
};
