import { Input } from "@/presentation/shadcn-ui/components/ui/input";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";

interface ICustomTextInputProps {
  label?: string;
  id: string;
  isValid?: boolean;
  validation?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  isDisabled?: boolean;
}

export const CustomTextInput = ({
  label = "",
  id,
  isValid = true,
  validation,
  value,
  onChange,
  maxLength,
  className = "",
  isDisabled,
}: ICustomTextInputProps) => {
  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex justify-between">
          <Label className="font-semibold" htmlFor={id}>
            {label}
          </Label>
          {maxLength && (
            <div className="text-xs">
              <span>{`${value.length} `}</span>
              <span>{`/ ${maxLength}`}</span>
            </div>
          )}
        </div>
        <Input
          id={id}
          type="text"
          error={!isValid && !!validation}
          value={value}
          onChange={(e) => {
            if (!maxLength || (maxLength && e.target.value.length <= maxLength))
              onChange(e.target.value);
          }}
          autoComplete="new-password"
          disabled={isDisabled}
          className="disabled:bg-gray-300 disabled:border-gray-400"
        />
        {!isValid && validation && (
          <p className="text-red-500 text-xs transition-all duration-300">
            {validation}
          </p>
        )}
      </div>
    </>
  );
};
