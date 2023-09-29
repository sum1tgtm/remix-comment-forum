import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import logo from "../images/logo.png";
import { Link } from "@remix-run/react";
import { UserButton, useAuth } from "@clerk/remix";

export const Navbar = () => {
  const { userId } = useAuth();
  return (
    <nav className="shadow-md bg-white">
      <div className="max-w-screen-xl mx-auto flex py-2 px-4 items-center">
        <div className="flex-1 flex items-center gap-6">
          <Link to="/">
            <img src={logo} alt="" className="w-[120px] h-auto" />
          </Link>
          <div className="max-w-sm w-full hidden sm:block relative">
            <Input type="text" placeholder="Search..." />
            <Button
              type="button"
              size="icon"
              className="absolute right-0 top-0"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {!userId ? (
          <div className="flex gap-4">
            <Button
              variant="link"
              asChild
              className="font-normal text-muted-foreground hover:bg-[#fafafa] transition-colors delay-100 ease-in-out text-base"
            >
              <Link to="/sign-in">Log in</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="outline outline-offset-0 outline-1 outline-indigo-500 hover:bg-[#fbfbfb] transition-colors delay-100 ease-in-out text-base"
            >
              <Link to="/sign-up">Create Account</Link>
            </Button>
          </div>
        ) : (
          <UserButton   />
        )}
      </div>
    </nav>
  );
};
