export type CommentsType = {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  parentId: string | null;
  user: {
    imageUrl: string;
    email: string;
  };
};
