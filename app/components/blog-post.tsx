import { CommentSection } from "~/components/comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import banner from "~/images/banner.webp";
import type { CommentsType } from "~/lib/types";

interface PropType {
  userId: string | null;
  comments: CommentsType;
}

export const BlogPost = ({ userId, comments }: PropType) => {
  return (
    <div className="min-h-screen bg-white">
      <img src={banner} alt="typescript vs golang" className="rounded-t" />

      <div className="py-8 px-16">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="john doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold cursor-pointer hover:text-indigo-900">
              john doe
            </span>
            <span className="text-xs text-muted-foreground">
              Posted on Sep 12
            </span>
          </div>
        </div>
        <article className="pt-8">
          <h1 className="text-5xl font-extrabold leading-[60px]">
            TypeScript and Go: Syntax Comparison and Contrast
          </h1>
          {blogContent}
        </article>
      </div>
      <Separator />
      <div className="py-8 px-16">
        <span className="font-bold text-2xl">Top Comments</span>
        <CommentSection comments={comments} />
      </div>
    </div>
  );
};

const blogContent = (
  <div className="pt-10 text-xl flex flex-col gap-4">
    <p>
      TypeScript and Go are two modern programming languages that have gained
      popularity for their simplicity, efficiency, and strong type systems.
      While they serve different purposes and have distinct features, comparing
      and contrasting their syntax can provide valuable insights into their
      strengths and use cases. In this article, we'll explore the syntax of
      TypeScript and Go, highlighting their similarities and differences.
    </p>

    <h2 className="font-bold text-3xl">Type Annotations vs. Type Inference</h2>
    <p>
      One of the key differences between TypeScript and Go is how they handle
      type annotations. TypeScript uses static typing with explicit type
      annotations, allowing developers to specify the types of variables,
      function parameters, and return values.
    </p>
    <p>
      In contrast, Go employs type inference, where the compiler deduces the
      variable types based on the assigned values.
    </p>
    <h2 className="font-bold text-3xl">Null and Undefined</h2>
    <p>
      TypeScript distinguishes between null and undefined, reflecting the
      semantics of JavaScript.
    </p>
    <p>
      Go, on the other hand, only has the nil value to represent the absence of
      a value.
    </p>
    <h2 className="font-bold text-3xl">Control Flow</h2>
    <p>
      Both languages support familiar control flow statements like if, for, and
      switch. However, TypeScript's syntax is influenced by JavaScript, while Go
      follows a more C-like syntax.
    </p>
    <h2 className="font-bold text-3xl">Functions</h2>
    <p>
      Functions in both languages are first-class citizens, but there are syntax
      differences.
    </p>
    <h2 className="font-bold text-3xl">Error Handling</h2>
    <p>
      TypeScript uses try, catch, and throw for error handling, similar to
      JavaScript.
    </p>
    <p>Go employs explicit error handling with returned error values.</p>
    <h2 className="font-bold text-3xl">Conclusion</h2>
    <p>
      While TypeScript and Go have distinct syntax styles influenced by their
      respective programming paradigms, both languages prioritize simplicity,
      readability, and expressiveness. TypeScript's focus on strong typing and
      its close relationship with JavaScript make it an excellent choice for
      frontend and full-stack web development. Go's emphasis on performance,
      concurrency, and simplicity makes it ideal for backend development and
      system programming.
    </p>
    <p>
      By understanding the syntax similarities and differences between
      TypeScript and Go, developers can leverage the strengths of each language
      to build robust and efficient applications tailored to their specific
      requirements.
    </p>
  </div>
);
