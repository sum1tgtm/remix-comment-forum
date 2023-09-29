import { AuthorCard } from "./author-card";
import { BlogList } from "./blog-list";

export const RightPanel = () => {
  return (
    <aside className="lg:flex flex-col gap-4 hidden  min-w-[268px] xl:min-w-[346px]">
      <AuthorCard />
      <BlogList />
    </aside>
  );
};
