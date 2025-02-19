"use client";
import * as React from "react";
import { Clipboard, Download, LinkIcon, Loader } from "lucide-react";
import { FadeUp } from "./ui/fade-up";
import { Card, CardContent } from "./ui/card";
import { Input } from "./extendui/input";
import { PulsatingOutlineShadowButton } from "./extendui/pulsating-outline-shadow-button";
import { Result } from "./result";
import { download } from "@/actions/download";
import { toast } from "sonner";
import { DownloadResponse } from "@/lib/types";

export const MainFeature = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<DownloadResponse | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleDownload = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            if (!e.currentTarget) return;
            const formData = new FormData(e.currentTarget);
            const url = formData.get("url") as string;

            if (!url) {
                toast("URL is required");
            }
            const res = await download(url);
            setData(res);
            toast("Video has been downloaded.");
        } catch (error) {
            console.error("Failed to download video:", error);
            toast("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (inputRef.current) {
                inputRef.current.value = clipboardText;
            }
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    };
    return (
        <section id="hero" className="space-y-10 z-50">
            <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 py-[14dvh] text-center">
                <div className="relative">
                    <FadeUp delay={0.2} duration={0.8}>
                        <h1 className="bg-gradient-to-br from-black via-zinc-600 to-zinc-400 bg-clip-text text-center text-3xl font-bold tracking-tight dark:from-white dark:via-neutral-200 dark:to-black/[0.6] sm:text-center sm:text-4xl md:text-6xl">
                            Download Videos in a Snap!
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.4} duration={0.8}>
                        <p className="mx-2 mt-6 max-w-2xl text-base font-light tracking-tight dark:text-zinc-300 sm:text-xl">
                            Instantly download videos from your favorite platforms. Fast,
                            easy, and free – grab your videos anytime, anywhere!
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.6} duration={1}>
                        <div className="mt-6 flex items-center justify-center gap-3 p-4 md:p-8">
                            <Card className="w-full">
                                <form onSubmit={handleDownload}>
                                    <CardContent className="p-6 w-full md:min-w-xl space-y-4">
                                        <Input
                                            ref={inputRef}
                                            name="url"
                                            type="text"
                                            placeholder="Insert URL here..."
                                        >
                                            <Input.Group>
                                                <Input.LeftIcon>
                                                    <LinkIcon />
                                                </Input.LeftIcon>
                                                <Input.RightIcon>
                                                    <Clipboard onClick={handlePaste} />
                                                </Input.RightIcon>
                                            </Input.Group>
                                        </Input>
                                        <PulsatingOutlineShadowButton
                                            className="w-full"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <Loader size={18} className="animate-spin mr-2" />
                                            ) : (
                                                <Download size={18} className="mr-2" />
                                            )}
                                            {isLoading ? "Downloading..." : "Download"}
                                        </PulsatingOutlineShadowButton>
                                    </CardContent>
                                </form>
                            </Card>
                        </div>
                    </FadeUp>
                    <Result isDownloaded={!!data} data={data as DownloadResponse} />
                    <div className="gradient pointer-events-none absolute inset-0 -z-10 block opacity-30 blur-3xl" />
                </div>
            </div>
        </section>
    );
};
