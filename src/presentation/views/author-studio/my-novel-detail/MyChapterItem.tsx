import type { ChapterInList } from "@/domain/entities/chapter.entity";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import { formatDate, formatNumber } from "@/shared/constants/constants";
import { Eye, Heart } from "lucide-react";

interface IMyChapterItemProps {
  chapter: ChapterInList;
  goToEditChapter: (chapterId: number) => void;
}

export const MyChapterItem = ({
  chapter,
  goToEditChapter,
}: IMyChapterItemProps) => {
  return (
    <div className="flex flex-col py-2 border-b border-x px-4">
      <p
        className="text-sm font-semibold truncate"
        onClick={() => goToEditChapter(chapter.id)}
      >
        {chapter.title ? chapter.title : "Chương truyện chưa đặt tên"}
      </p>
      <div className="text-sm text-muted-foreground flex gap-2 mb-1">
        <span className="flex gap-1 items-center">
          <Eye className="size-[1em]" />
          {formatNumber(chapter.numberOfViews)}
        </span>
        <span className="flex gap-1 items-center">
          <Heart className="size-[1em]" />
          {formatNumber(chapter.numberOfVotes)}
        </span>
        {chapter.isPublished ? (
          <Badge className="bg-[#41AB5D] text-white">Đã đăng</Badge>
        ) : (
          <Badge variant="secondary">Bản thảo</Badge>
        )}
      </div>
      {chapter.isPublished && !!chapter.publishedAt ? (
        <p className="text-sm text-muted-foreground">
          Đã đăng vào {formatDate(chapter.publishedAt, true)}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Cập nhật vào {formatDate(chapter.updatedAt, true)}
        </p>
      )}
    </div>
  );
};
