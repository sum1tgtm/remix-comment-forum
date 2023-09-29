import { Form, useNavigation } from "@remix-run/react";
import { Dot } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import type { CommentsType } from "~/lib/types";

interface PropType {
  comments: CommentsType[];
}

export const CommentSection = ({ comments }: PropType) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  const commentsByParent = useMemo(() => {
    if (comments.length === 0) {
      return [];
    }
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    return commentsByParent[parentId] as CommentsType[];
  };

  const rootComments: CommentsType[] = commentsByParent[null];
  return (
    <section className="pb-4 pt-8">
      <div className="flex gap-2">
        <Avatar className="h-8 w-8">
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
          <Button type="submit" className="mt-3 px-6" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </div>

      <div className="pt-6">
        {rootComments != null && rootComments.length > 0 && (
          <div className="flex gap-4 flex-col ">
            {rootComments.map((comment) => (
              <div className="flex gap-1.5" key={comment.id}>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src={comment.user.imageUrl}
                    alt={comment.user.email}
                  />
                  <AvatarFallback>
                    {comment.user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-2 p-4 border-muted border rounded-lg">
                    <span className="flex items-center">
                      <Button variant="ghost" className="px-1">{comment.user.email}</Button>
                      <Dot className="text-gray-400/75" />
                      <small>
                        {new Date(comment.createdAt).toDateString()}
                      </small>
                    </span>
                    <div>{comment.message}</div>
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
