'use client'

import { useAuthResetStore } from '@/lib/store/useAuthResetStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormValues, resetPasswordSchema } from '@/lib/validations/auth.schema';
import { resetPasswordService } from '@/service/auth/authResetService';
import ReusableInput from '@/components/reusable/InputFiled/ReusableInput';
import EyeOnIcon from '@/icons/EyeOnIcon';
import { ArrowLeft, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

const ResetPasswordForm = () => {
    const router = useRouter();
    const { email, otp, clear } = useAuthResetStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!isSubmitted && (!email || !otp)) {
            router.replace("/dashboard/auth/forgot-password");
        }
    }, [email, otp, router, isSubmitted]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async ({ new_password }: ResetPasswordFormValues) => {
        try {
            await resetPasswordService({ email, otp, new_password });

            setIsSubmitted(true);

            toast.success("Password reset successfully!");
            clear();
            router.push("/dashboard/auth/login");
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Failed to reset password. Please try again.";
            toast.error(message);
        }
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 text-left">
            {/* New Password */}
            <div className="relative">
                <ReusableInput
                    {...register("new_password")}
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    error={errors.new_password?.message}
                    className="pr-12"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[28px] p-2 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-all outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <EyeOnIcon className="w-4 h-4" />}
                </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
                <ReusableInput
                    {...register("confirm_password")}
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your new password"
                    error={errors.confirm_password?.message}
                    className="pr-12"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[28px] p-2 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-all outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <EyeOnIcon className="w-4 h-4" />}
                </button>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-blue-900/20 mt-2 flex items-center justify-center gap-2 disabled:bg-neutral-800 disabled:text-gray-500"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Resetting…
                    </>
                ) : (
                    "Reset password"
                )}
            </button>
            <Link
                href="/dashboard/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition mt-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </Link>
        </form>
    )
}

export default ResetPasswordForm