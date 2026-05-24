'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { resendOtpService, verifyEmailOtpService } from "@/service/auth/authResetService";
import { useAuthResetStore } from "@/lib/store/useAuthResetStore";
import { useResendCountdown } from "@/hooks/auth/useResendCountDown";
import OtpInput from "@/components/Dashboard/auth/OtpInput";
import { OtpFormValues, otpSchema } from "@/lib/validations/auth.schema";

const OtpForm = () => {
    const router = useRouter();
    const { email, setOtp } = useAuthResetStore();
    const { count, canResend, reset } = useResendCountdown(60);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (!email) router.replace("/dashboard/auth/forgot-password");
    }, [email, router]);

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    const otpValue = watch("otp");

    const onSubmit = async ({ otp }: OtpFormValues) => {
        try {
            await verifyEmailOtpService({ email, otp });
            setOtp(otp);
            toast.success("OTP verified!");
            router.push("/dashboard/auth/reset-password");
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Invalid or expired OTP.";
            toast.error(message);
        }
    };

    const handleResend = async () => {
        setResending(true);
        try {
            await resendOtpService({ email });
            toast.success("New OTP sent to your email.");
            reset();
            setValue("otp", "");
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Could not resend OTP.";
            toast.error(message);
        } finally {
            setResending(false);
        }
    };
    return (
        <div className="text-center w-full">
            <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
                Check your email
            </h1>
            <p className="mb-2 text-sm leading-relaxed text-zinc-500">
                We sent a 4-digit code to
            </p>
            <p className="mb-8 text-sm font-medium text-zinc-300">{email}</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 w-full">
                {/* OTP boxes */}
                <div className="space-y-2">
                    <OtpInput
                        value={otpValue}
                        onChange={(val) => setValue("otp", val, { shouldValidate: true })}
                        hasError={!!errors.otp}
                    />
                    {errors.otp && (
                        <p className="text-center text-xs text-red-500 font-medium">
                            {errors.otp.message}
                        </p>
                    )}
                </div>

                {/* Verify button */}
                <button
                    type="submit"
                    disabled={isSubmitting || otpValue.length < 4}
                    className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-blue-900/20 mt-2 flex items-center justify-center gap-2 disabled:bg-neutral-800 disabled:text-gray-500"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verifying…
                        </>
                    ) : (
                        "Verify code"
                    )}
                </button>
            </form>

            {/* Resend */}
            <div className="mt-6 text-center text-sm text-zinc-500">
                Didn&apos;t receive a code?{" "}
                {canResend ? (
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="font-medium text-blue-400 transition hover:text-blue-300 disabled:opacity-60"
                    >
                        {resending ? "Sending…" : "Resend OTP"}
                    </button>
                ) : (
                    <span className="text-zinc-600">
                        Resend in{" "}
                        <span className="tabular-nums text-zinc-400">{count}s</span>
                    </span>
                )}
            </div>

            <Link
                href="/dashboard/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition mt-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </Link>
        </div>
    )
}

export default OtpForm