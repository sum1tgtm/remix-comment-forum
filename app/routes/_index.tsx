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
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const body = await args.request.formData();
  const comment = await db.comment.create({
    data: {
      message: body.get("message") as string,
      user: {
        connectOrCreate: {
          where: {
            userId,
          },
          create: {
            userId,
          },
        },
      },
    },
  });
  return comment;
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
