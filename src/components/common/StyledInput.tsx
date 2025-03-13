import { Input } from "@/components/ui/input";
import { baseInputStyles, cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type StyledInputProps = {
  icon: LucideIcon;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export function StyledInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: Readonly<StyledInputProps>) {
  return (
    <div className="relative w-full">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(baseInputStyles, "pl-10")}
      />
    </div>
  );
}
