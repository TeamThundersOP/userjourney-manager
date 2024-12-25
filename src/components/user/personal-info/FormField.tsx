import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

const FormField = ({ label, id, value, onChange, disabled, required = true, type = "text" }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full ${
          disabled ? 'bg-gray-100' : 'bg-white'
        } border-gray-200 focus:border-[#9b87f5] focus:ring-[#9b87f5] transition-colors duration-200`}
      />
    </div>
  );
};

export default FormField;