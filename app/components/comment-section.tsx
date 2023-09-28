import { Form } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export const CommentSection = () => {
  return (
    <section className="py-4">
      <div className="flex gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="john doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Form method="post" action="/?index" className="w-full max-w-full">
          <Textarea placeholder="Add to the discussion" name="message" />
          <Button type="submit" className="mt-3 px-6">
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
};
