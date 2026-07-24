function fetchVolume() {
    return new Promise<{ volume: string; count: number; updatedAt: string }>((resolve) => {
        setTimeout(() => {
            const volume = Math.floor(1000 + Math.random() * 5000);
            const count = Math.floor(150 + Math.random() * 300);
            resolve({
                volume: `$${volume.toLocaleString()}`,
                count,
                updatedAt: new Date().toLocaleTimeString(),
            });
        }, 1500);
    });
}

export default async function TransactionPage() {
    const data = await fetchVolume();

    return (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400">Live Transaction Volume (SSR)</h3>
            <p className="text-3xl font-extrabold text-blue-400 mt-2">{data.volume}</p>
            <p className="text-xs text-slate-500 mt-2">Updated at: {data.updatedAt}</p>
        </div>
    );
}
