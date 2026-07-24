'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function AutoRefresh({ intervalMs = 5000 }: { intervalMs?: number }) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    useEffect(() => {
        const timer = setInterval(() => {
            startTransition(() => {
                router.refresh();
            });
        }, intervalMs);
        return () => clearInterval(timer);
    }, [router, intervalMs]);

    return null;
}
