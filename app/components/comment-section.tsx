import { Form, useNavigation } from "@remix-run/react";
import { Dot, MessageSquare, ThumbsUp } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import type { CommentType } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import { Input } from "./ui/input";

interface PropType {
  comments: CommentType[];
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
    return commentsByParent[parentId] as CommentType[];
  };

  const rootComments: CommentType[] = commentsByParent[null];
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
          <Input type="hidden" name="type" />
          <Input type="hidden" name="parentId" />
          <Textarea placeholder="Add to the discussion" name="message" />
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
        {rootComments != null && rootComments.length > 0 && (
          <div className="flex gap-4 flex-col ">
            {rootComments.map((comment, i) => (
              <div className="flex gap-1.5" key={comment.id}>
                <Avatar className="h-8 w-8 cursor-pointer mt-3">
                  <AvatarImage
                    src={comment.user.imageUrl}
                    alt={comment.user.email}
                  />
                  <AvatarFallback>
                    {comment.user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-col gap-2 px-4 py-3 border-muted border rounded-lg">
                    <span className="flex items-center">
                      <Button variant="ghost" className="px-1" type="button">
                        {comment.user.email}
                      </Button>
                      <Dot className="text-gray-400/75" />
                      <small className="ml-3 text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </small>
                    </span>
                    <p className="text-lg">{comment.message}</p>
                  </div>

                  <div className="flex gap-1">
                    <Button variant="ghost" type="button">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      <span className="font-normal">{i} Likes</span>
                    </Button>
                    <Button variant="ghost" type="button">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="font-normal"> Reply</span>
                    </Button>
                  </div>
                  {/* reploy text-area */}
                  <div className="">
                    <Form
                      ref={formRef}
                      method="post"
                      action="/?index"
                      className="w-full max-w-full"
                    >
                      <Input type="hidden" name="parentId" value={comment.id} />
                      <Textarea
                        placeholder="Add to the discussion"
                        name="message"
                      />
                      <Button
                        type="submit"
                        className="mt-3 px-6"
                        disabled={
                          isSubmitting &&
                          navigation.formData?.get("parentId") === comment.id
                        }
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
