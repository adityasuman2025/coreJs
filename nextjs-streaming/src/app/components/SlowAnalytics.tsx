import React from "react";

async function getAnalyticsData() {
    // Simulate a slow 3-second database network round-trip
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { revenue: "$42,350", conversions: "4.8%" };
}

export default async function SlowAnalytics() {
    const data = await getAnalyticsData();

    return (
        <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold mb-4">Real-Time Revenue</h2>
            <div className="text-3xl font-extrabold text-emerald-400">{data.revenue}</div>
            <p className="text-sm text-slate-400 mt-2">Conversions: {data.conversions}</p>
        </div>
    );
}
