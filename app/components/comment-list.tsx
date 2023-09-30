import { CommentItem } from "~/components/comment-item";
import type { CommentType } from "~/lib/types";

interface PropType {
  comments: CommentType[];
  getReplies: (parentId: string) => CommentType[];
}

export const CommentList = ({ comments, getReplies }: PropType) => {
  return (
    <div className="flex flex-col gap-4 ">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          getReplies={getReplies}
        />
      ))}
    </div>
  );
};
