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
  const replyFormRef = useRef<HTMLFormElement | null>(null);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      commentFormRef.current?.reset();
      replyFormRef.current?.reset();
    }
  }, [isSubmitting, navigation]);

  const commentsByParent = useMemo(() => {
    if (comments.length === 0) {
      return [];
    }
    const group = {};
    comments.forEach((comment) => {
      //@ts-ignore
      group[comment.parentId] ||= [];
      //@ts-ignore
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    //@ts-ignore
    return commentsByParent[parentId] as CommentType[];
  };

  //@ts-ignore
  const rootComments: CommentType[] = commentsByParent[null];
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
          // <div className="flex gap-4 flex-col ">
          //   {rootComments.map((comment) => (
          //     <div className="flex gap-1.5" key={comment.id}>
          //       <Avatar className="h-8 w-8 cursor-pointer mt-3">
          //         <AvatarImage
          //           src={comment.user.imageUrl}
          //           alt={comment.user.email}
          //         />
          //         <AvatarFallback>
          //           {comment.user.email.slice(0, 2).toUpperCase()}
          //         </AvatarFallback>
          //       </Avatar>
          //       <div className="flex flex-col gap-1 w-full">
          //         <div className="flex flex-col gap-2 px-4 py-3 border-muted border rounded-lg">
          //           <span className="flex items-center">
          //             <Button variant="ghost" className="px-1" type="button">
          //               {comment.user.email}
          //             </Button>
          //             <Dot className="text-gray-400/75" />
          //             <small className="ml-3 text-muted-foreground">
          //               {formatDate(comment.createdAt)}
          //             </small>
          //           </span>
          //           <p className="text-lg">{comment.message}</p>
          //         </div>
          //         {/*  */}
          //         <div className="flex gap-1">
          //           <Button variant="ghost" type="button">
          //             <ThumbsUp className="h-4 w-4 mr-2" />
          //             <span className="font-normal">3 Likes</span>
          //           </Button>
          //           <Button variant="ghost" type="button">
          //             <MessageSquare className="h-4 w-4 mr-2" />
          //             <span className="font-normal"> Reply</span>
          //           </Button>
          //         </div>
          //         {/* reploy text-area */}
          //           <Form
          //             ref={replyFormRef}
          //             method="post"
          //             action="/?index"
          //             className="w-full max-w-full"
          //             // hacky method to reset reply-form until I figure it out
          //             key={Math.random()}
          //           >
          //             <Input type="hidden" name="parentId" value={comment.id} />
          //             <Textarea
          //               placeholder="Add to the discussion"
          //               name="message"
          //             />
          //             <Button
          //               type="submit"
          //               className="mt-3 px-6"
          //               disabled={
          //                 isSubmitting &&
          //                 navigation.formData?.get("parentId") === comment.id
          //               }
          //             >
          //               Submit
          //             </Button>
          //           </Form>
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <CommentList comments={rootComments} getReplies={getReplies} />
        )}
      </div>
    </section>
  );
};
