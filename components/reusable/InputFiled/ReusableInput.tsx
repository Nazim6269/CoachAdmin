import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ReusableInputProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ReusableInput = ({
  label,
  error,
  containerClassName,
  required,
  className,
  type = "text", // default type
  ...props
}: ReusableInputProps) => {
  return (
    <div className={`space-y-1.5 ${containerClassName || ""}`}>
      {label && (
        <Label className="text-sm text-whiteColor font-medium">
          {label} {required && <span className="text-redColor">*</span>}
        </Label>
      )}

      <Input
        type={type}
        className={`h-12! !text-white border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 focus:bg-black ${className || ""}`}
        {...props}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ReusableInput;
