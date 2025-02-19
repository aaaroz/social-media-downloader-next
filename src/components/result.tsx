import * as React from "react";
import Link from "next/link";
import { FadeUp } from "./ui/fade-up";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BadgeAlert, Film, ImageIcon, Music, Video } from "lucide-react";
import { Button } from "./extendui/button";
import { availablePlatform } from "@/lib/constants";
import { DownloadResponse } from "@/lib/types";
import { toast } from "sonner";
import { downloadTikTokHD } from "@/actions/download-tiktok-hd";

export const Result = ({
    isDownloaded = false,
    data,
}: {
    isDownloaded?: boolean;
    data: DownloadResponse;
}) => {
    const HDQuality = data?.downloads.find(
        (item) => item.type === "download_video_hd",
    );
    const mp3 = data?.downloads.find(
        (item) => item.type === "Download\n\t\t\t\tMP3",
    );
    const noWM = data?.downloads.find((item) => item.type === "Tanpa tanda air");

    const handleHDQuality = async () => {
        try {
            const urlObj = new URL(HDQuality?.url as string);
            const params = new URLSearchParams(urlObj.search);
            const { url } = Object.fromEntries(params);
            await downloadTikTokHD(url);
            toast("HD video downloaded Successfuly!");
        } catch (error) {
            console.error(error);
            toast("Something went wrong 😔");
        }
    };
    return (
        <FadeUp delay={0.6} duration={1}>
            <div className="mt-6 flex items-center justify-center gap-3 p-4 md:p-8">
                <Card className="w-full">
                    <CardHeader className="gap-4 flex-row items-center">
                        <div className="size-2 rounded-full bg-cyan-600" />
                        <CardTitle>
                            {isDownloaded ? "Result" : "Available Platform"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="w-full md:min-w-xl space-y-6">
                        {isDownloaded ? (
                            <>
                                <div className="flex gap-4">
                                    <div className="p-8 size-24 flex rounded-lg items-center justify-center bg-input border border-border">
                                        <ImageIcon />
                                    </div>
                                    <div className="grid">
                                        <div>
                                            <div className="flex gap-2">
                                                <h2>Author</h2>
                                                <span>:</span>
                                                <h3>{data.username}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Platform</h2>
                                                <span>:</span>
                                                <h3>{data.platform}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Caption</h2>
                                                <span>:</span>
                                                <h3>{data.caption}</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Downloaded at</h2>
                                                <span>:</span>
                                                <h3>{data.date}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2">
                                    {HDQuality && (
                                        <Button variant="outline" onClick={handleHDQuality}>
                                            <Film size={18} className="mr-2" />
                                            HD Quality
                                        </Button>
                                    )}
                                    {noWM && (
                                        <Link href={noWM.url} target="_blank" className="w-full">
                                            <Button variant="outline" className="w-full">
                                                <Video size={18} className="mr-2" />
                                                No Watermark
                                            </Button>
                                        </Link>
                                    )}
                                    {mp3 && (
                                        <Link href={mp3.url} target="_blank" className="w-full">
                                            <Button variant="outline" className="w-full">
                                                <Music size={18} className="mr-2" />
                                                MP3
                                            </Button>
                                        </Link>
                                    )}
                                    {!HDQuality && !noWM && !mp3 && (
                                        <Button variant="outline">
                                            <BadgeAlert size={18} className="mr-2" />
                                            No Download Links Found.
                                        </Button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex">
                                {availablePlatform.map((platform) => (
                                    <Button size="sm" variant="outline" key={platform.code}>
                                        {platform.icon}
                                        {platform.name}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </FadeUp>
    );
};
