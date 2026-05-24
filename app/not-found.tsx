import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-xl p-8 text-center space-y-4">

        <h2 className="text-3xl font-bold text-white">404</h2>

        <h3 className="text-lg font-semibold text-gray-200">
          Page Not Found
        </h3>

        <p className="text-sm text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-3 px-5 py-2.5 rounded-lg bg-blueColor text-whiteColor font-medium "
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}