"use server";
import { DownloadRequest, DownloadResponse } from "@/lib/types";

export async function download(url: string): Promise<DownloadResponse> {
    const baseUrl = process.env.BASE_URL_API!;
    const endpoint = "/download";
    const apiUrl = `${baseUrl}${endpoint}`;

    const requestBody: DownloadRequest = {
        url,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: DownloadResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error downloading video:", error);
        throw error;
    }
}
