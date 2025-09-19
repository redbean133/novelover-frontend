import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/presentation/shadcn-ui/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn-ui/components/ui/select";
import { paginationSizeArray } from "@/shared/constants/constants";

interface MyPaginationProps {
  totalPages: number;
  page: number;
  onChangePage: (page: number) => void;
  limit?: number;
  onChangeLimit?: (limit: number) => void;
  isShowSelect?: boolean;
}

export function MyPagination({
  totalPages,
  page,
  limit,
  onChangePage,
  onChangeLimit,
  isShowSelect = false,
}: MyPaginationProps) {
  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 4) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onChangePage(page - 1);
              }}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onChangePage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={idx}>
                <span className="px-2">…</span>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onChangePage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {isShowSelect && (
        <div className="mt-2 flex items-center justify-between">
          {!!limit && !!onChangeLimit && (
            <div className="flex justify-center items-center">
              <span className="text-sm mr-2">Truyện / trang: </span>
              <Select
                value={limit.toString()}
                onValueChange={(size) => onChangeLimit(Number(size))}
              >
                <SelectTrigger className="w-fit h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paginationSizeArray.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-center items-center">
            <span className="text-sm mr-2">Trang: </span>
            <Select
              value={page.toString()}
              onValueChange={(pageNumber) => onChangePage(Number(pageNumber))}
            >
              <SelectTrigger className="w-fit h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top" align="end">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <SelectItem key={p} value={p.toString()}>
                      {p}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
