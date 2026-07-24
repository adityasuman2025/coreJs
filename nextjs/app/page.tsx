import Link from 'next/link';

export default function RootPage() {
    return (
        <div className="p-10 max-w-xl mx-auto font-sans">
            <h1 className="text-3xl font-extrabold text-slate-800">Next.js Demos</h1>
            <p className="text-slate-600 mb-6 mt-2">Select a demo route to explore Next.js App Router features:</p>
            <ul className="flex flex-col gap-4 list-none">
                <li className="border border-slate-300 p-4 rounded-lg bg-slate-900 text-white">
                    <Link href="/parallel-routing" prefetch={false} className="font-bold text-lg underline text-blue-400">
                        /parallel-routing
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">
                        Parallel Routing (@transaction, @chart, @realtime) + Live WebSocket
                    </p>
                </li>
                <li className="border border-slate-300 p-4 rounded-lg bg-slate-900 text-white">
                    <Link href="/component-streaming" prefetch={false} className="font-bold text-lg underline text-blue-400">
                        /component-streaming
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">
                        Component-Level Streaming using React Suspense
                    </p>
                </li>
                <li className="border border-slate-300 p-4 rounded-lg bg-slate-900 text-white">
                    <Link href="/page-streaming" prefetch={false} className="font-bold text-lg underline text-blue-400">
                        /page-streaming
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">
                        Page-Level Streaming using route-level loading.tsx
                    </p>
                </li>
            </ul>
        </div>
    );
}
