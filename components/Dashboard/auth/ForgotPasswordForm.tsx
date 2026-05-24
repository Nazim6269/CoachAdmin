'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

import ReusableInput from "@/components/reusable/InputFiled/ReusableInput"
import { useAuthResetStore } from "@/lib/store/useAuthResetStore"
import { forgotPasswordService } from "@/service/auth/authResetService"

const schema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
})

type FormValues = z.infer<typeof schema>

export default function ForgotPasswordForm() {

    const router = useRouter()
    const setEmail = useAuthResetStore((s) => s.setEmail)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: "" },
    })

    const onSubmit = async ({ email }: FormValues) => {
        try {
            await forgotPasswordService({ email })

            setEmail(email)

            toast.success("OTP sent! Check your inbox.")

            router.push("/dashboard/auth/otp")

        } catch (err: unknown) {

            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Something went wrong. Please try again."

            toast.error(message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
        >

            <p className="text-gray-400 text-sm text-center leading-relaxed">
                Enter the email address associated with your account and we'll send an OTP to reset your password.
            </p>

            <ReusableInput
                {...register("email")}
                label="Email"
                type="email"
                placeholder="Enter your email address"
            />

            {errors.email && (
                <span className="text-red-400 text-xs font-medium -mt-3">
                    {errors.email.message}
                </span>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-blue-900/20 mt-2"
            >
                {isSubmitting ? "Sending..." : "Send OTP"}
            </button>

            <Link
                href="/dashboard/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </Link>

        </form>
    )
}