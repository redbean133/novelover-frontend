import { useEffect, type RefObject } from "react";

export const useClickOutsideHook = (
  ref: RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};
