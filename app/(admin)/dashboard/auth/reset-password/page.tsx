import Image from "next/image";
import ResetPasswordForm from "@/components/Dashboard/auth/ResetPasswordForm";


export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6">
                <Image
                    src="/site_logo.png"
                    alt="site logo"
                    width={160}
                    height={20}
                    className="mb-2"
                />

                <div className="text-center w-full">
                    <h1 className="mb-1 text-2xl font-semibold tracking-tight text-white">
                        Set new password
                    </h1>
                    <p className="mb-8 text-sm leading-relaxed text-zinc-500">
                        Choose a strong password for your account.
                    </p>

                    <ResetPasswordForm />

                </div>
            </div>
        </main>
    );
}