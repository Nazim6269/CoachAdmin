export function triggerFileDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

export function buildReportFileName(reportName: string): string {
    const timestamp = new Date().toISOString().split("T")[0];
    return `${reportName}-${timestamp}.pdf`
}