import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Option } from "@/constants/types/common.type";
import { baseInputStyles, cn } from "@/lib/utils";

type StyledSelectProps = {
  label?: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function StyledSelect({ label, options, placeholder, value, onChange }: Readonly<StyledSelectProps>) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={cn(baseInputStyles, "w-full")}>
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyledSelect;
