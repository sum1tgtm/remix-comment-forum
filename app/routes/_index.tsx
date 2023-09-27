import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/navbar";
// import banner from "../images/banner.webp";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Demo" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans">
      <Navbar />
    </div>
  );
}
