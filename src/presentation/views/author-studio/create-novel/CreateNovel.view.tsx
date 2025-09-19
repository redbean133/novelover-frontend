import { H1 } from "@/presentation/components/typography/H1/H1";
import { NovelForm } from "./NovelForm";

export const CreateNovelView = () => {
  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <H1>Truyện mới</H1>{" "}
      </header>
      <main className="flex flex-col gap-6 mt-6">
        <NovelForm />
      </main>
    </>
  );
};
