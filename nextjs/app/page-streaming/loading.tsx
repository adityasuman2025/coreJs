import SkeletonLoader from "@/components/SkeletonLoader";

export default function DashboardLoading() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800">Page-Level Streaming</h2>
            <div className="mt-4">
                <SkeletonLoader title="page status" />
            </div>
        </div>
    );
}
