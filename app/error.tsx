"use client"

import React from "react"
import { AlertTriangle } from "lucide-react"
import "../app/globals.css"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">

            <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-8 text-center space-y-6">

                {/* icon */}
                <div className="flex justify-center">
                    <div className="bg-red-500/10 text-red-400 p-4 rounded-full border border-red-500/20">
                        <AlertTriangle size={28} />
                    </div>
                </div>

                {/* text */}
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Something went wrong
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        An unexpected error occurred. Please try again.
                    </p>
                </div>

                {/* dev error message */}
                {process.env.NODE_ENV === "development" && (
                    <p className="text-xs text-red-400 break-words bg-red-500/5 border border-red-500/20 p-3 rounded-md">
                        {error.message}
                    </p>
                )}

                {/* button */}
                <button
                    onClick={() => reset()}
                    className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                >
                    Try Again
                </button>

            </div>
        </div>
    )
}