import type { Novel } from "@/domain/entities/novel.entity";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  defaultNovelCoverUrl,
  formatNumber,
} from "@/shared/constants/constants";
import { Eye, FilePlus2, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface IMyNovelCardProps {
  novel: Novel;
  handleClickNewChapter?: (novelId: number) => void;
  handleClickLinkToDetail: () => void;
}

export const MyNovelCard = ({
  novel,
  handleClickNewChapter = () => {},
  handleClickLinkToDetail,
}: IMyNovelCardProps) => {
  return (
    <div className="flex gap-4 h-40 mb-2 relative overflow-hidden">
      <img
        src={novel.coverUrl || defaultNovelCoverUrl}
        className="w-30 h-full object-cover rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      />
      {novel.isOriginal && (
        <div className="absolute top-3 -left-10 w-32 transform -rotate-45 opacity-75">
          <div className="bg-indigo-500 text-white text-center text-xs font-bold py-1 shadow-md">
            Sáng tác
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <Link
            to={`${novel.id}`}
            className="font-bold truncate"
            onClick={() => handleClickLinkToDetail()}
          >
            {novel.title}
          </Link>
          {!novel.isOriginal && (
            <p className="text-sm text-muted-foreground mb-1 truncate">
              {novel.author.name}
            </p>
          )}
          <div className="text-sm text-muted-foreground flex gap-2 mb-1">
            {novel.averageRating !== "0.00" && (
              <span className="flex gap-1 items-center">
                <Star className="size-[1em]" color="#FFC107" fill="#FFC107" />
                {novel.averageRating}
              </span>
            )}
            {novel.numberOfViews !== 0 && (
              <span className="flex gap-1 items-center">
                <Eye className="size-[1em]" />
                {formatNumber(novel.numberOfViews, { short: true })}
              </span>
            )}
          </div>

          <p className="text-sm text-indigo-400 mb-1">
            {novel.numberOfPublishedChapters > 0
              ? `${formatNumber(
                  novel.numberOfPublishedChapters
                )} chương đã đăng`
              : "Chưa đăng chương nào"}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            {novel.numberOfChapters - novel.numberOfPublishedChapters > 0
              ? `${formatNumber(
                  novel.numberOfChapters - novel.numberOfPublishedChapters
                )} bản thảo`
              : "Không có bản thảo"}
          </p>
          {novel.isCompleted && (
            <Badge className="bg-[#41AB5D] text-white font-semibold">
              Đã hoàn thành
            </Badge>
          )}
        </div>
        {!novel.isCompleted && (
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => handleClickNewChapter(novel.id)}
          >
            <FilePlus2 /> Chương mới
          </Button>
        )}
      </div>
    </div>
  );
};
