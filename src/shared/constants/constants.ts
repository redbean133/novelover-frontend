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

export const defaultCoverUrl =
  "https://res.cloudinary.com/dlmrbvtbp/image/upload/v1757043303/user-cover/p5bwrsqq3wlhgvgoulov.jpg";

export const defaultAvatarUrl =
  "https://res.cloudinary.com/dlmrbvtbp/image/upload/v1757041917/default-avatar_om15xg.jpg";

export const formatNumber = Intl.NumberFormat("en", {
  notation: "compact",
}).format;

export const formatDate = (time: string | Date | number) => {
  const date = new Date(time);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  return formattedDate;
};
