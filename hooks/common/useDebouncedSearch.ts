import { useEffect, useState } from "react"

export function useDebouncedSearch<T>(searchTerm: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(searchTerm), delay)
        return () => clearTimeout(timer)
    }, [searchTerm, delay])

    return debouncedValue
}