import type { CommentType } from "~/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { formatDate } from "~/lib/utils";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Form, useNavigation } from "@remix-run/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { CommentList } from "./comment-list";

interface PropType {
  comment: CommentType;
  getReplies: (parentId: string) => CommentType[];
}

export const CommentItem = ({ comment, getReplies }: PropType) => {
  const replyFormRef = useRef<HTMLFormElement | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      replyFormRef.current?.reset();
      setIsFormVisible(false);
    }
  }, [isSubmitting]);

  const childComments = getReplies(comment.id);
  return (
    <div className="flex gap-1.5">
      <Avatar className="mt-3 h-8 w-8 cursor-pointer">
        <AvatarImage src={comment.user.imageUrl} alt={comment.user.email} />
        <AvatarFallback>
          {comment.user.email.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {/*  */}
      <div className="flex w-full flex-col gap-1">
        {/*  */}
        <div className="flex flex-col gap-2 rounded-lg border border-muted px-4 py-3">
          <span className="flex items-center">
            <Button variant="ghost" className="px-1" type="button">
              {comment.user.email}
            </Button>
            <Dot className="text-gray-400/75" />
            <small className="text-muted-foreground sm:ml-3">
              {formatDate(comment.createdAt)}
            </small>
          </span>
          <p className="sm:text-lg">{comment.message}</p>
        </div>
        {/*  */}
        <div className="flex gap-1">
          <Button variant="ghost" type="button">
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span className="font-normal">3 Likes</span>
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsFormVisible(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="font-normal"> Reply</span>
          </Button>
        </div>
        {/*  */}
        <Form
          ref={replyFormRef}
          method="post"
          action="/?index"
          className={`w-full max-w-full ${isFormVisible ? "block" : "hidden"}`}
        >
          <Input type="hidden" name="parentId" value={comment.id} />
          <Textarea
            placeholder="Add to the discussion"
            name="message"
            required
          />
          <div className="float-right mt-1 flex gap-2">
            <Button
              type="submit"
              variant="secondary"
              disabled={
                isSubmitting &&
                navigation.formData?.get("parentId") === comment.id
              }
              className="px-5"
            >
              Reply
            </Button>
            <Button
              type="button"
              onClick={() => setIsFormVisible(false)}
              variant="ghost"
            >
              Dismiss
            </Button>
          </div>
        </Form>
        {/*  */}
        {childComments?.length > 0 && (
          <CommentList comments={childComments} getReplies={getReplies} />
        )}
      </div>
    </div>
  );
};
