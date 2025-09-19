import * as React from "react";
import { X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/presentation/shadcn-ui/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/presentation/shadcn-ui/components/ui/command";
import { useEffect, useRef } from "react";

export type Item = Record<"value" | "label", string>;

interface IMultiSelectProps {
  items: Item[];
  selectedValues: string[];
  placeHolder: string;
  onChangeSelected: (selected: string[]) => void;
  maxSelected?: number;
  error?: boolean;
}

export const MultiSelect = ({
  items,
  selectedValues,
  placeHolder,
  onChangeSelected,
  maxSelected,
  error,
}: IMultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>(
    items.filter((item) => selectedValues.includes(item.value))
  );
  const selectables = items.filter(
    (item) => !selected.some((s) => s.value === item.value)
  );
  const [inputValue, setInputValue] = React.useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChangeSelected(selected.map((item) => item.value));
  }, [selected]);

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className={`group rounded-md border px-3 py-2 text-sm focus-within:ring-[1px]
          ${
            error
              ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-400"
              : "border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          }`}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge key={item.value} variant="secondary">
                {item.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeHolder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open &&
          selectables.length > 0 &&
          (!maxSelected || (maxSelected && maxSelected > selected.length)) ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full max-h-50 overflow-scroll">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => [...prev, item]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};
