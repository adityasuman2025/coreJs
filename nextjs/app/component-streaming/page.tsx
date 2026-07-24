import { Suspense } from "react";
import SlowAnalytics from "@/components/SlowAnalytics";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function ComponentStreamingPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-800">Component-Level Streaming</h2>
            <p className="text-slate-400">Header renders immediately, analytics streams in via React Suspense.</p>

            <div className="mt-6">
                <Suspense fallback={<SkeletonLoader title="analytics data" />}>
                    <SlowAnalytics />
                </Suspense>
            </div>
        </div>
    );
}
