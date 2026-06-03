import React from "react";
import Link from "next/link";

// Forces this route to render on every request — enables streaming at runtime.
export const dynamic = "force-dynamic";

async function getDashboardData() {
    // Simulate slow fetch
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return { status: "All systems operational" };
}

export default async function DashboardPage() {
    const data = await getDashboardData();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <Link href="/" className="text-sm text-blue-400 hover:underline">
                    ← Back to Portal
                </Link>
                <span className="text-xs text-slate-500 font-mono">Page-Level Streaming</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-100">Dashboard Status</h1>
            <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800">
                <p className="text-lg text-emerald-400 font-semibold">{data.status}</p>
            </div>
        </div>
    );
}
