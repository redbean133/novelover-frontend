export const Gender = {
  Unknown: 0,
  Male: 1,
  Female: 2,
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const UserRole = {
  Normal: 0,
  Admin: 1,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const AccountStatus = {
  Normal: 0,
  SelfLocked: 1,
  AdminLocked: 2,
} as const;

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export type Sort = "ASC" | "DESC";

export const defaultCoverUrl =
  "https://res.cloudinary.com/dlmrbvtbp/image/upload/v1757043303/user-cover/p5bwrsqq3wlhgvgoulov.jpg";

export const defaultAvatarUrl =
  "https://res.cloudinary.com/dlmrbvtbp/image/upload/v1757041917/default-avatar_om15xg.jpg";

export const defaultNovelCoverUrl =
  "https://res.cloudinary.com/dlmrbvtbp/image/upload/v1757670849/a549fc16ade7791fe82311973f1f6947_dxzomh.jpg";

type FormatNumberOptions = {
  short?: boolean; // if true: 1K, 1M; false: 1.000, 1.000.000
};

const compactFormatter = new Intl.NumberFormat("en", { notation: "compact" });
const fullFormatter = new Intl.NumberFormat("vi-VN");

export const formatNumber = (
  num: number,
  options: FormatNumberOptions = {}
): string => {
  if (options.short) {
    return compactFormatter.format(num);
  }
  return fullFormatter.format(num);
};

export const formatDate = (
  time: string | Date | number,
  isShowTime = false
) => {
  const date = new Date(time);

  const dateStr = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  if (!isShowTime) return dateStr;

  const timeStr = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${timeStr} ${dateStr}`;
};

export const paginationSizeArray = [12, 24, 48];
