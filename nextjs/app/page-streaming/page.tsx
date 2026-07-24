function getDashboardDataMock() {
    return new Promise<{ status: string }>((resolve) => {
        setTimeout(() => {
            resolve({ status: "All systems operational" });
        }, 2000);
    });
}

export default async function DashboardPage() {
    const data = await getDashboardDataMock();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800">Page-Level Streaming</h2>
            <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800 mt-4">
                <p className="text-lg text-emerald-400 font-semibold">{data.status}</p>
            </div>
        </div>
    );
}
