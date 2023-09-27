import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Sidebar = () => {
  return (
    <div className="flex flex-col pt-16 pr-4 gap-8">
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
      <MoreHorizontal className="cursor-pointer hover:rounded-full hover:bg-gray-300/50 text-muted-foreground hover:text-foreground" />
    </div>
  );
};
