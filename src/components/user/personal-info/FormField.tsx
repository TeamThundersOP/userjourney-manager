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
          disabled ? 'bg-gray-50' : 'bg-white'
        } border-gray-200 focus:border-[#D3E4FD] focus:ring-[#E5DEFF] text-gray-700 placeholder-gray-400 transition-colors duration-200`}
      />
    </div>
  );
};

export default FormField;