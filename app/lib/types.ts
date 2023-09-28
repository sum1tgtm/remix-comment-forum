export type CommentsType = ({
  user: {
    imageUrl: string;
  };
} & {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId: string | null;
})[];
