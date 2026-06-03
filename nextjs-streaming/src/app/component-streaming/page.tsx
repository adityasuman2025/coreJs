import React, { Suspense } from "react";
import Link from "next/link";
import SlowAnalytics from "@/app/components/SlowAnalytics";
import { AnalyticsSkeleton } from "@/app/components/Skeletons";

function DashboardHeader() {
    return (
        <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-100">Management Dashboard</h1>
            <p className="text-slate-400">Welcome back! Here is your daily overview.</p>
        </header>
    );
}

export default function ComponentStreamingPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <Link href="/" className="text-sm text-blue-400 hover:underline">
                    ← Back to Portal
                </Link>
                <span className="text-xs text-slate-500 font-mono">Component-Level Streaming</span>
            </div>

            {/* 1. This streams down to the browser immediately */}
            <DashboardHeader />

            {/* 2. The skeleton streams immediately, then swaps with the real UI later */}
            <Suspense fallback={<AnalyticsSkeleton />}>
                <SlowAnalytics />
            </Suspense>
        </div>
    );
}
