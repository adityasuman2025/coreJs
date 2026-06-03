import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] text-slate-100">
            <div className="max-w-xl w-full text-center space-y-8">
                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">
                        Next.js Streaming Demo
                    </h1>
                    <p className="text-slate-400">
                        Select an option below to observe Next.js App Router streaming behavior in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/component-streaming"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 transition duration-200"
                    >
                        <h2 className="text-lg font-bold text-slate-200 mb-1">
                            Component-Level
                        </h2>
                        <p className="text-xs text-slate-400">
                            Uses React Suspense to stream in individual parts.
                        </p>
                    </Link>

                    <Link
                        href="/page-streaming"
                        className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 transition duration-200"
                    >
                        <h2 className="text-lg font-bold text-slate-200 mb-1">
                            Page-Level
                        </h2>
                        <p className="text-xs text-slate-400">
                            Uses loading.tsx to suspend the entire route.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
