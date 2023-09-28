import {
  redirect,
  type DataFunctionArgs,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { Navbar } from "~/components/navbar";
import { Sidebar } from "~/components/sidebar";
import { RightPanel } from "~/components/right-panel";
import { BlogPost } from "~/components/blog-post";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/db.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { createClerkClient } from "@clerk/remix/api.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Demo" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (args: DataFunctionArgs) => {
  const { userId } = await getAuth(args);

  const comments = await db.comment.findMany();
  return {
    comments,
    userId,
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

    const comment = await db.comment.create({
      data: {
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
      },
    });
    return comment;
  } catch (error) {
    return error;
  }
};

export default function Index() {
  const { comments, userId } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans bg-[#f5f5f5]">
      <Navbar />
      <main className="min-h-screen max-w-screen-xl mx-auto pt-4 flex gap-4 px-4">
        <aside>
          <Sidebar />
        </aside>
        <BlogPost userId={userId} />
        <aside>
          <RightPanel />
        </aside>
      </main>
    </div>
  );
}
