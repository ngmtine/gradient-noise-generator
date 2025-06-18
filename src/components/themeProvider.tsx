"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
    return (
        <NextThemesProvider //
            defaultTheme="system"
            attribute="data-theme"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
};

/*

# use client
next-themesのThemeProviderは、モードの永続化にlocalStorageを使用しているので、client componentsとして実行される
（"use client"宣言しなくても自動的にそうなるけど。。）


# next-themesとdaisyuiによるダークモードの仕組み
next-themesの役割: ThemeToggleButtonをクリックすると、next-themesライブラリが<html>タグにdata-theme="dark"を付与します。
daisyUIの役割: daisyUIは、<html>にdata-theme="dark"が存在するかを監視しています。そして、data-theme="dark"がある場合とない場合で、--color-base-100のようなCSS変数の中身の値を動的に切り替えます。

ライトモード時（data-theme="dark"なし）:
--color-base-100 の値は #ffffff (白) やそれに近い色に設定される。

ダークモード時（data-theme="dark"あり）:
--color-base-100 の値は #000000 (黒) やそれに近い色に設定される。

結果:
<html>タグに常に適用されているbackground-color: var(--color-base-100)というルールは変わりませんが、その変数の値が入れ替わることで、結果的に背景色が切り替わるのです。

これは、utilityクラス（bg-white, dark:bg-black）を付け替えるよりも、より効率的でクリーンな方法です。

*/
