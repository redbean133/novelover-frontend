import { Checkbox } from "@/presentation/shadcn-ui/components/ui/checkbox";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";

interface ICustomCheckbox {
  className?: string;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export const CustomCheckbox = ({
  className = "",
  id,
  checked,
  onCheckedChange,
  label,
}: ICustomCheckbox) => {
  return (
    <div className={`${className} flex gap-2`}>
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};
