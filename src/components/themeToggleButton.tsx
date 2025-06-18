"use client";

import { useTheme } from "next-themes";
import { startTransition } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

/**
 * ダークモード切り替えボタン
 */
export const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme();

    // トグルボタン押下ハンドラ 詳細下部
    const handleToggle = () => {
        startTransition(() => {
            setTheme(theme === "dark" ? "nord" : "dark");
        });
    };

    return (
        <button
            title="ダークモード切り替えボタン"
            type="button"
            onClick={handleToggle}
            className="
                flex items-center justify-center
                h-7 w-11 rounded-full cursor-pointer
                transition-all duration-300 ease-in-out
                bg-gray-200 hover:bg-gray-300
                dark:bg-gray-700 dark:hover:bg-gray-600"
        >
            <span className="sr-only">Toggle theme</span>

            {/* スライダー */}
            <span
                className="
                    flex items-center justify-center
                    h-6 w-6 rounded-full
                    transition-all duration-300 ease-in-out
                    bg-white
                    -translate-x-2 dark:translate-x-2"
            >
                {/* 太陽 */}
                <FaSun
                    className="
                        absolute h-4 w-4 text-yellow-500
                        transition-all duration-300 ease-out
                        opacity-100 dark:opacity-0"
                />
                {/* 月 */}
                <FaMoon
                    className="
                        absolute h-4 w-4 text-indigo-600
                        transition-all duration-300 ease-out
                        opacity-0 dark:opacity-100"
                />
            </span>
        </button>
    );
};

/*

daisyuiのtoggleクラスでは、ボタンのクリックイベントハンドラ指定時にアニメーションできなかった
イベントハンドラの実行により、アニメーションが実行される前に再レンダリングされるからであると思われる

（上述の通り）startTransitionを使用しないと、アニメーションが実行される前にコンポーネントが再レンダリングされてしまう
（アニメーションが実行されない）
https://ja.react.dev/reference/react/startTransition

指定するtheme自体は、globals.css側で有効化しておく必要がある
https://daisyui.com/docs/themes/

*/
