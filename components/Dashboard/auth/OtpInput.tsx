
import { useRef } from "react";


interface OtpInputProps {
    value: string;
    onChange: (val: string) => void;
    hasError: boolean;
}

const OtpInput = ({ value, onChange, hasError }: OtpInputProps) => {
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const digits = value.split("").concat(Array(4).fill("")).slice(0, 4);

    const handleChange = (idx: number, char: string) => {
        const sanitized = char.replace(/\D/g, "").slice(-1);
        const next = digits.map((d, i) => (i === idx ? sanitized : d)).join("");
        onChange(next);
        if (sanitized && idx < 3) inputs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (
        idx: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !digits[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        onChange(pasted.padEnd(4, "").slice(0, 4));
        const nextFocus = Math.min(pasted.length, 3);
        inputs.current[nextFocus]?.focus();
    };

    return (
        <div className="flex items-center justify-center gap-3">
            {digits.map((digit, idx) => (
                <input
                    key={idx}
                    ref={(el) => { inputs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className={`h-14 w-14 rounded-xl border text-center text-xl font-semibold text-white outline-none transition focus:ring-2 bg-black/50 ${hasError
                        ? "border-red-500/50 focus:ring-red-500/30"
                        : digit
                            ? "border-blue-500/50 focus:ring-blue-500/40"
                            : "border-white/[0.08] hover:border-white/[0.14] focus:ring-blue-500/30"
                        }`}
                />
            ))}
        </div>
    );
}

export default OtpInput
