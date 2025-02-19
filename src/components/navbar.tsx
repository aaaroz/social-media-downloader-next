"use client";

import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export const Navbar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky z-50 flex h-14 w-full items-center top-0 justify-between backdrop-blur-md bg-neutral-50/15 dark:bg-neutral-900/15 px-4 md:h-20 md:px-8">
            <div className="flex items-center justify-between mx-auto container w-full">
                <Link
                    href={"/"}
                    className="text-xl font-bold text-primary hover:cursor-pointer md:text-2xl"
                >
                    Zap
                </Link>
                <Button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    size="icon"
                    variant="ghost"
                >
                    {theme === "dark" ? <Sun suppressHydrationWarning /> : <Moon suppressHydrationWarning />}
                </Button>
            </div>
        </header>
    );
};
