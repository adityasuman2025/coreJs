import React from "react";

export function AnalyticsSkeleton() {
    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 animate-pulse">
            <div className="h-6 w-1/3 bg-slate-800 rounded mb-4"></div>
            <div className="h-10 w-1/2 bg-slate-800 rounded"></div>
        </div>
    );
}
