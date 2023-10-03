import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useMemo, useRef } from "react";
import { CommentList } from "~/components/comment-list";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { CommentType } from "~/lib/types";

interface PropType {
  comments: CommentType[];
}

export const CommentSection = ({ comments }: PropType) => {
  const commentFormRef = useRef<HTMLFormElement | null>(null);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      commentFormRef.current?.reset();
    }
  }, [isSubmitting]);

  const commentsByParent = useMemo(() => {
    if (comments.length === 0) {
      return {};
    }
    const group: Record<string, CommentType[]> = {};
    comments.forEach((comment) => {
      group[comment.parentId || String(null)] ||= [];
      group[comment.parentId || String(null)].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    return commentsByParent[parentId] as CommentType[];
  };

  const rootComments: CommentType[] = commentsByParent[String(null)];
  return (
    <section className="pb-4 pt-8">
      <div className="flex gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="john doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Form
          ref={commentFormRef}
          method="post"
          action="/?index"
          className="w-full max-w-full"
        >
          <Input type="hidden" name="type" />
          <Input type="hidden" name="parentId" />
          <Textarea
            placeholder="Add to the discussion"
            name="message"
            required
          />
          <Button
            type="submit"
            className="mt-3 px-6"
            disabled={isSubmitting && !navigation.formData?.get("parentId")}
          >
            Submit
          </Button>
        </Form>
      </div>

      <div className="pt-6">
        {rootComments !== null && rootComments.length > 0 && (
          <CommentList comments={rootComments} getReplies={getReplies} />
        )}
      </div>
    </section>
  );
};
