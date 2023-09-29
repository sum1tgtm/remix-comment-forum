import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export const AuthorCard = () => {
  return (
    <Card className="px-0 relative">
      <div className="py-4 bg-indigo-950 rounded-t"></div>
      <CardHeader className="absolute -top-1.5 flex flex-row items-end gap-4 cursor-pointer">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="john doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="text-lg font-bold hover:text-indigo-900/95">
          john doe
        </span>
      </CardHeader>
      <CardContent className="pt-[52px] ">
        <Button className="w-full">Follow</Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <span className="font-medium text-sm">JOINED</span>
        <span>Sep 27, 2023</span>
      </CardFooter>
    </Card>
  );
};
