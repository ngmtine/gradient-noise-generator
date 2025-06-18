import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type MouseEvent = globalThis.MouseEvent;

interface UseDragProps {
    ref: RefObject<HTMLElement | null>; // ドラッグ対象要素のref
}

/**
 * 要素をドラッグ可能にするためのロジックを提供するカスタムフック
 * @param {UseDragProps} props - フックのプロパティ
 * @returns ドラッグ可能な要素の位置と、ドラッグ開始イベントハンドラ
 */
export const useDrag = ({ ref }: UseDragProps) => {
    // ドラッグ可能な要素の現在位置
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // ドラッグ操作中かどうかを管理するフラグ
    const [isDragging, setIsDragging] = useState(false);
    // マウスカーソルと要素の左上隅との相対的な位置（オフセット）
    const dragOffset = useRef({ x: 0, y: 0 });

    /**
     * ドラッグ開始時のイベントハンドラ
     */
    const handleDragStart = useCallback(
        (event: React.MouseEvent) => {
            if (!ref.current) return;

            // テキスト選択などのブラウザのデフォルト動作を抑制
            event.preventDefault();
            setIsDragging(true);

            // refが有効な場合に、マウス位置と要素のオフセットを計算
            const rect = ref.current.getBoundingClientRect();
            dragOffset.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        },
        [ref]
    );

    /**
     * ドラッグ中のマウス移動イベントハンドラ
     */
    const handleDragging = useCallback(
        (event: MouseEvent) => {
            // ドラッグ中でなければ何もしない
            if (!isDragging) return;

            // マウスの現在位置からオフセットを引いて、要素の新しい位置を計算
            setPosition({
                x: event.clientX - dragOffset.current.x,
                y: event.clientY - dragOffset.current.y,
            });
        },
        [isDragging]
    );

    /**
     * ドラッグ終了時のイベントハンドラ
     */
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // グローバルなマウスイベント（移動・ボタンアップ）を監視
    useEffect(() => {
        // ドラッグ中のみイベントリスナーを登録
        if (isDragging) {
            window.addEventListener("mousemove", handleDragging);
            window.addEventListener("mouseup", handleDragEnd);
        }

        // クリーンアップ関数：コンポーネントのアンマウント時やドラッグ終了時にリスナーを削除
        return () => {
            window.removeEventListener("mousemove", handleDragging);
            window.removeEventListener("mouseup", handleDragEnd);
        };
    }, [isDragging, handleDragging, handleDragEnd]);

    // 初回マウント時に要素を画面中央に配置
    useEffect(() => {
        if (!ref.current) return;

        const { innerWidth, innerHeight } = window;
        const { offsetWidth } = ref.current;
        setPosition({
            x: (innerWidth - offsetWidth) / 2,
            y: innerHeight * 0.1, // 画面の上から10%の位置に
        });
    }, [ref]);

    // フックの利用側には、計算された位置とドラッグ開始ハンドラを返す
    return { position, handleDragStart };
};
