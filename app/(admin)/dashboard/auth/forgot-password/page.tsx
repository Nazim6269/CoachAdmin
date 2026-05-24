import ForgotPasswordForm from '@/components/Dashboard/auth/ForgotPasswordForm'
import Image from 'next/image'

const ForgotPasswordPage = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6">

                <Image
                    src="/site_logo.png"
                    alt="site logo"
                    width={160}
                    height={20}
                    className="mb-2"
                />
                <h2 className='text-white text-xl'>Forgot Password</h2>
                <ForgotPasswordForm />

            </div>
        </div>
    )
}

export default ForgotPasswordPage
