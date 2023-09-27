import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/navbar";
import { Sidebar } from "~/components/sidebar";
import { RightPanel } from "~/components/right-panel";
import { BlogPost } from "~/components/blog-post";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Demo" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans bg-[#f5f5f5]">
      <Navbar />
      <main className="min-h-screen max-w-screen-xl mx-auto pt-4 flex gap-4">
        <aside>
          <Sidebar />
        </aside>
          <BlogPost />
        <aside>
          <RightPanel />
        </aside>
      </main>
    </div>
  );
}
