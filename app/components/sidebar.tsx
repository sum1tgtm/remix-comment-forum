import { Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const Sidebar = () => {
  return (
    <aside className="hidden flex-col items-center gap-8 pt-16 sm:flex xl:px-4">
      <div className="flex flex-col justify-center gap-2">
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger>
              <Heart className="cursor-pointer text-muted-foreground hover:text-red-500" />
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
              <MessageCircle className="cursor-pointer text-muted-foreground hover:text-green-500" />
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
              <Bookmark className="cursor-pointer text-muted-foreground hover:text-blue-500" />
              <span className="text-center">3</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Save to bookmarks</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        size="icon"
        variant="ghost"
        className="group rounded-full hover:bg-gray-300/50"
      >
        <MoreHorizontal className="text-muted-foreground group-hover:text-foreground" />
      </Button>
    </aside>
  );
};
