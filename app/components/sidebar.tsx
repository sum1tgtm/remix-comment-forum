import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

export const Sidebar = () => {
  return (
    <div className="flex flex-col pt-16 xl:px-4 gap-8 items-center">
      <div className="flex flex-col justify-center gap-2">
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger>
              <Heart className="hover:text-red-500 cursor-pointer text-muted-foreground" />
              <span className="text-center">1</span>
            </TooltipTrigger>
            <TooltipContent>Like</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TooltipProvider delayDuration={10}>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex flex-col justify-center gap-2">
              <MessageCircle className="hover:text-green-500 cursor-pointer text-muted-foreground" />
              <span className="text-center">0</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Jump to comments</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={10}>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex flex-col justify-center gap-2">
              <Bookmark className="hover:text-blue-500 cursor-pointer text-muted-foreground" />
              <span className="text-center">3</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Save to bookmarks</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-gray-300/50 group"
      >
        <MoreHorizontal className="text-muted-foreground group-hover:text-foreground" />
      </Button>
    </div>
  );
};
