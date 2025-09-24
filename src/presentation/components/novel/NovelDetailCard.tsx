import type { PublicNovelInList } from "@/domain/entities/novel.entity";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import {
  defaultNovelCoverUrl,
  formatNumber,
} from "@/shared/constants/constants";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface INovelDetailCardProps {
  novel: PublicNovelInList;
  className?: string;
  handleClickLinkToDetail: () => void;
}

export const NovelDetailCard = ({
  className,
  novel,
  handleClickLinkToDetail,
}: INovelDetailCardProps) => {
  const numberOfRowsDisplayDescription = 4 - (novel.isOriginal ? 0 : 1);
  return (
    <div
      className={`flex gap-4 h-40 mb-2 relative overflow-hidden ${className}`}
    >
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
            to={`/novels/${novel.id}`}
            className="font-bold truncate"
            onClick={handleClickLinkToDetail}
          >
            {novel.title}
          </Link>
          {!novel.isOriginal && (
            <p className="text-sm text-muted-foreground mb-1 truncate">
              {novel.author.name}
            </p>
          )}
          <div className="text-sm text-muted-foreground flex gap-2 mb-1">
            {novel.numberOfViews !== 0 && (
              <span className="flex gap-1 items-center">
                <Eye className="size-[1em]" />
                {formatNumber(novel.numberOfViews, { short: true })}
              </span>
            )}
            <p className="text-sm text-indigo-400">
              {`${formatNumber(novel.numberOfPublishedChapters)} Chương`}
            </p>
          </div>

          {novel.description && (
            <p
              className={`text-sm text-muted-foreground ${
                numberOfRowsDisplayDescription === 4
                  ? "line-clamp-4"
                  : "line-clamp-3"
              }`}
            >
              {novel.description}
            </p>
          )}
        </div>

        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {novel.isCompleted && (
            <Badge className="bg-[#41AB5D] text-white font-semibold mr-1">
              Đã hoàn thành
            </Badge>
          )}
          {novel.genres.map((genre) => (
            <Badge className="bg-[#DBE3FF] text-[#88A4E8] font-semibold mr-1">
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
