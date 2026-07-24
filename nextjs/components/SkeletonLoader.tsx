import React from 'react';

export default function SkeletonLoader({ title = 'Loading...' }: { title?: string }) {
    return (
        <div className="p-4 border border-slate-700 bg-slate-900 rounded-lg animate-pulse">
            <p className="text-sm text-slate-400 font-mono">Loading {title}...</p>
        </div>
    );
}
