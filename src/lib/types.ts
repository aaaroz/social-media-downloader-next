interface DownloadRequest {
    url: string;
}

interface DownloadResponse {
    author: string;
    caption: string;
    comments: number;
    date: string;
    downloads: Array<{
        filename: string;
        type: string;
        url: string;
    }>;
    "img-thumb": string;
    like: number;
    platform: string;
    username: string;
    views: number;
}

export type { DownloadRequest, DownloadResponse };
