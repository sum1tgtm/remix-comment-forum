import { AuthorCard } from "./author-card";
import { BlogList } from "./blog-list";

export const RightPanel = () => {
  return (
    <aside className="hidden min-w-[268px] flex-col gap-4  lg:flex xl:min-w-[346px]">
      <AuthorCard />
      <BlogList />
    </aside>
  );
};
