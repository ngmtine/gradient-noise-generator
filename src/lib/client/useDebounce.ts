import { useCallback, useEffect, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: 可変長引数を受け入れるためにanyを使用
type AnyFunction = (...args: any[]) => any;

/**
 * コールバック関数をデバウンス化するカスタムフック
 * @template T - デバウンス化する関数の型
 * @param {T} callback - デバウンスしたいコールバック関数
 * @param {number} delay - 遅延時間（ミリ秒）
 * @returns デバウンス化されたコールバック関数
 */
export const useDebounce = <T extends AnyFunction>(callback: T, delay: number): ((...args: Parameters<T>) => void) => {
    // タイマーidを保持するためのref（再レンダリングを引き起こさずに値を保持するため）
    const timeoutIdRef = useRef<NodeJS.Timeout>(undefined);

    // コンポーネントがアンマウントされる際に、実行待ちのタイマーがあればクリアする
    // これにより、コンポーネントが消えた後にコールバックが実行されるといったメモリリークを防ぐ
    useEffect(
        () => () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        },
        []
    );

    // デバウンス化された関数をuseCallbackでメモ化する
    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            // 既存のタイマーがあればクリアする
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            // 新しいタイマーをセットし、遅延後に元のコールバックを実行する
            timeoutIdRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay] // 元のコールバック関数か遅延時間が変更された場合のみ、この関数を再生成する
    );

    return debouncedCallback;
};
