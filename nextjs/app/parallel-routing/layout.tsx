import React from 'react';

export default function DashboardLayout({
    children,
    transaction,
    chart,
    realtime,
}: {
    children: React.ReactNode;
    transaction: React.ReactNode;
    chart: React.ReactNode;
    realtime: React.ReactNode;
}) {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6 text-slate-100">
            {children}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>{transaction}</div>
                <div>{realtime}</div>
            </div>
            <div className="mt-6">{chart}</div>
        </div>
    );
}
