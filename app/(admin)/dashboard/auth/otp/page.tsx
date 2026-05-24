import OtpForm from "@/components/Dashboard/auth/OtpForm";
import Image from "next/image";



export default function VerifyOtpPage() {


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

                <OtpForm />
            </div>
        </main>
    );
}