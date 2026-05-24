export function extractUniqueValues<T, K extends keyof T>(
    data: T[],
    key: K
): T[K][] {
    return Array.from(
        new Set(
            data?.map((item) => item[key])
                .filter((value) => value !== undefined && value !== null)
        )
    );
}