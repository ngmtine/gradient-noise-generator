import Link from "next/link";
import { ThemeToggleButton } from "./themeToggleButton";

const title = process.env.NEXT_PUBLIC_TITLE;

/**
 * 画面上部ヘッダーコンポーネント
 */
export const Header = async () => {
    return (
        <header className="bg-base-200/80 backdrop-blur-sm shadow-xl p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    {title}
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggleButton />
                </div>
            </nav>
        </header>
    );
};
