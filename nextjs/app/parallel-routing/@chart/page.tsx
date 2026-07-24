'use client';

import { useEffect, useState } from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';

function fetchRevenueMock() {
    return new Promise<{ date: string; revenue: number }[]>((resolve) => {
        setTimeout(() => {
            const days = 30;
            const data = [];
            const now = new Date();

            for (let i = days - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const revenue = Math.floor(12000 + Math.random() * 8000 + (30 - i) * 300);
                data.push({ date: dayLabel, revenue });
            }

            resolve(data);
        }, 2000);
    });
}

export default function ChartPage() {
    const [data, setData] = useState<{ date: string; revenue: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRevenueMock()
            .then((res) => {
                setData(res);
                setLoading(false);
            });
    }, []);

    if (loading) return <SkeletonLoader title="30-Day Revenue Chart (CSR)" />;
    return (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400">30-Day Revenue Chart (CSR)</h3>
            <p className="text-xs text-slate-500 mt-1">Data points: {data.length} days fetched client-side (useEffect).</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
                {data.slice(0, 5).map((item, idx) => (
                    <li key={idx}>
                        {item.date}: ${item.revenue}
                    </li>
                ))}
                {data.length > 5 && <li className="text-xs text-slate-500">... and {data.length - 5} more days</li>}
            </ul>
        </div>
    );
}
