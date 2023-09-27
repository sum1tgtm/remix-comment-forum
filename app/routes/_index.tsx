import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/navbar";
import banner from "../images/banner.webp";
import { Sidebar } from "~/components/sidebar";
import { RightPanel } from "~/components/right-panel";

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
        <div className="sticky left-0">
          <Sidebar />
        </div>
        <div>
          <img src={banner} alt="typescript vs golang" className="rounded-t" />
        </div>
        <div>
          <RightPanel />
        </div>
      </main>
    </div>
  );
}
