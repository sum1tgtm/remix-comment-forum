export type CommentType = {
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

export type QueryData = {
  message: string;
  user: {
    connectOrCreate: {
      where: {
        userId: string;
      };
      create: {
        userId: string;
        email: string;
        imageUrl: string;
      };
    };
  };
  parent?: {
    connect: {
      id: string;
    };
  };
};
