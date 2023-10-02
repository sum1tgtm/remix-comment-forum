import { createClerkClient } from "@clerk/remix/api.server";
import { getAuth } from "@clerk/remix/ssr.server";
import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlogPost } from "~/components/blog-post";
import { Navbar } from "~/components/navbar";
import { RightPanel } from "~/components/right-panel";
import { Sidebar } from "~/components/sidebar";
import { db } from "~/lib/db.server";
import type { QueryData } from "~/lib/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Simple Commenting Forum | Remix" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const comments = await db.comment.findMany({
    include: {
      user: {
        select: {
          imageUrl: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    comments,
  };
};

export const action = async (args: ActionFunctionArgs) => {
  try {
    const { userId } = await getAuth(args);
    if (!userId) {
      return redirect("/sign-in");
    }

    const user = await createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    }).users.getUser(userId);

    const body = await args.request.formData();

    let data: QueryData = {
      message: body.get("message") as string,
      user: {
        connectOrCreate: {
          where: {
            userId: user.id,
          },
          create: {
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
          },
        },
      },
    };

    const parentId = body.get("parentId");

    if (parentId) {
      data.parent = {
        connect: {
          id: parentId as string,
        },
      };
    }

    const comment = await db.comment.create({
      data,
    });

    return comment;
  } catch (error) {
    return error;
  }
};

export default function Index() {
  const { comments } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#f5f5f5] font-sans">
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-screen-xl gap-4 sm:px-4 sm:pt-4">
        <Sidebar />
        <BlogPost comments={comments} />
        <RightPanel />
      </main>
    </div>
  );
}
