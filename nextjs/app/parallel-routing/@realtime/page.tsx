'use client';

import { useEffect, useState } from 'react';

export default function RealTimePage() {
    const [errorRate, setErrorRate] = useState<number>(0);
    const [status, setStatus] = useState<string>('connecting');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => setStatus('connected');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (typeof data.errorRate === 'number') setErrorRate(data.errorRate);
        };
        ws.onclose = () => setStatus('disconnected');
        return () => ws.close();
    }, []);

    return (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400">Real-Time Error Rate (WebSocket)</h3>
            <p className={`text-3xl font-extrabold mt-2 ${errorRate > 3 ? 'text-red-400' : 'text-emerald-400'}`}>
                {errorRate}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Status: {status}</p>
        </div>
    );
}
