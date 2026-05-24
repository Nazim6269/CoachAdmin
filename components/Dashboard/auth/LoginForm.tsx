'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"
import ReusableInput from "../../reusable/InputFiled/ReusableInput"
import EyeOnIcon from "@/icons/EyeOnIcon"
import { EyeOffIcon } from "lucide-react"
import { useLogin } from "@/hooks/auth/useLogin"
import { LoginFormValues, loginSchema } from "@/lib/validations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginCredentials } from "@/types/auth"
import Link from "next/link"
import { toast } from "sonner"


export default function LoginForm() {
    const { login, isLoading, error, clearError } = useLogin()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    })

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
        clearError()
        await login(data as LoginCredentials as { email: string, password: string })
    }

    const isPending = isLoading || isSubmitting;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
        >{error && (
            <div
                role="alert"
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mt-0.5 shrink-0"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                    />
                </svg>
                {error}
            </div>
        )}

            <div>
                <ReusableInput
                    {...register("email",)}
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    className="py-3"
                /> {errors.email && (
                    <span className="text-red-400 text-xs font-medium -mt-3">Email is required</span>
                )}
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative group">
                <div>
                    <ReusableInput
                        {...register("password")}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-12"
                    />
                    {errors.password && (
                        <span className="text-red-400 text-xs font-medium -mt-3">Password is required</span>
                    )}

                </div>

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] p-2 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-all outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeOnIcon className="w-4 h-4" />}
                </button>
            </div>


            <div className="flex justify-end -mt-2">
                <Link
                    href="/dashboard/auth/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-blue-900/20 mt-2" disabled={isPending}
            >
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>

        </form>
    )
}