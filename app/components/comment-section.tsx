import { Form, useNavigation } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef } from "react";

export const CommentSection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);
  return (
    <section className="py-4">
      <div className="flex gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="john doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Form
          ref={formRef}
          method="post"
          action="/?index"
          className="w-full max-w-full"
        >
          <Textarea placeholder="Add to the discussion" name="message" />
          <Button type="submit" className="mt-3 px-6">
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
};
