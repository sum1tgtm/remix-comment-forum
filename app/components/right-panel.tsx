import { AuthorCard } from "./author-card";
import { BlogList } from "./blog-list";

export const RightPanel = () => {
  return (
    <div className="flex flex-col gap-4">
      <AuthorCard />
      <BlogList />
    </div>
  );
};
