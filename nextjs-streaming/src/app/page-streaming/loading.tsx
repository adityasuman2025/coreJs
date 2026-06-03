import React from "react";

export default function DashboardLoading() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-4 animate-pulse">
            <div className="flex justify-between items-center pb-4 border-b border-slate-850">
                <div className="h-4 w-20 bg-slate-800 rounded" />
                <div className="h-4 w-28 bg-slate-800 rounded" />
            </div>
            <div className="h-8 w-1/3 bg-slate-800 rounded" />
            <div className="h-32 w-full bg-slate-800 rounded" />
        </div>
    );
}
