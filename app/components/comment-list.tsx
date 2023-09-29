import type { CommentType } from "~/lib/types";
import { CommentItem } from "./comment-item";

interface PropType {
  comments: CommentType[];
  getReplies: (parentId: string) => CommentType[];
}

export const CommentList = ({ comments, getReplies }: PropType) => {
  return (
    <div className="flex gap-4 flex-col ">
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
