"use server";

export const downloadTikTokHD = async (urlParam: string) => {
    const apiUrl = `https://ssstik.io/abc?url=${urlParam}`;
    const tt = urlParam.split("==")[0];
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "hx-current-url": "https://ssstik.io/id",
                "hx-request": "true",
                "hx-target": "hd_download",
                "hx-trigger": "hd_download",
                pragma: "no-cache",
                priority: "u=1, i",
            },
            body: JSON.stringify({ tt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error calling the API:", error);
        throw error;
    }
};
