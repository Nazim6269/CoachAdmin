'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react";

export default function useQueryState(key: string, defaultValue: string) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const value = useMemo(() => {
        const value = sp.get(key);
        return value || defaultValue;
    }, [sp, key, defaultValue])


    const setValue = useCallback((next: string) => {
        const params = new URLSearchParams(sp.toString())
        params.set(key, next)
        router.push(`${pathname}?${params.toString()}`)
    }, [router, pathname, sp, key])

    return [value, setValue] as const
}