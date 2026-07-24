function getAnalyticsDataMock() {
    return new Promise<{ revenue: string; conversions: string }>((resolve) => {
        setTimeout(() => {
            resolve({ revenue: "$42,350", conversions: "4.8%" });
        }, 2000);
    });
}

export default async function SlowAnalytics() {
    const data = await getAnalyticsDataMock();

    return (
        <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold mb-2">Real-Time Revenue</h3>
            <p className="text-3xl font-extrabold text-emerald-400">{data.revenue}</p>
            <p className="text-sm text-slate-400 mt-2">Conversions: {data.conversions}</p>
        </div>
    );
}
