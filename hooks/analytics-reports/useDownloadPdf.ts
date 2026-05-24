

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { triggerFileDownload } from "@/utils/download";
import { ApiError } from "@/lib/api/client";

interface UseDownloadPdfOptions<TVariables = void> {
    fetcher: (variables: TVariables) => Promise<Blob>;
    filename: string | ((variables: TVariables) => string);
    mutationOptions?: Omit<UseMutationOptions<void, ApiError, TVariables>, "mutationFn">;
}


export function useDownloadPdf<TVariables = void>({
    fetcher,
    filename,
    mutationOptions,
}: UseDownloadPdfOptions<TVariables>) {
    const mutation = useMutation<void, ApiError, TVariables>({
        ...mutationOptions,
        mutationFn: async (variables: TVariables) => {
            const blob = await fetcher(variables);
            const resolvedFilename =
                typeof filename === "function" ? filename(variables) : filename;
            triggerFileDownload(blob, resolvedFilename);
        },
    });

    return {
        download: mutation.mutate,
        downloadAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset,
    };
}