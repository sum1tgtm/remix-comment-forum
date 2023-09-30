import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import logo from "../images/logo.png";
import { Link } from "@remix-run/react";
import { UserButton, useAuth } from "@clerk/remix";

export const Navbar = () => {
  const { userId } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-screen-xl items-center px-4 py-2">
        <div className="flex flex-1 items-center gap-6">
          <Link to="/">
            <img src={logo} alt="" className="h-auto w-[120px]" />
          </Link>
          <div className="relative hidden w-full max-w-sm sm:block">
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
              className="text-base font-normal text-muted-foreground transition-colors delay-100 ease-in-out hover:bg-[#fafafa]"
            >
              <Link to="/sign-in">Log in</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="text-base outline outline-1 outline-offset-0 outline-indigo-500 transition-colors delay-100 ease-in-out hover:bg-[#fbfbfb]"
            >
              <Link to="/sign-up">Create Account</Link>
            </Button>
          </div>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  );
};
