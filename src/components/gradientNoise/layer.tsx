"use client";

import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useDrag } from "~/lib/client/useDrag";
import type { GradientNoiseStyle } from "~/lib/types";
import type { LayerInfo } from "~/lib/types";
import { GradientNoiseEditor } from "./gradientNoiseEditor";
import { GradientNoiseRenderer } from "./gradientNoiseRenderer";

interface LayerProps {
    rendererProps: LayerInfo;
    onUpdate: (id: number, newProps: Partial<GradientNoiseStyle>) => void;
    onDelete: (id: number) => void;
}

/**
 * 編集機能と背景要素のセットを統合して表示するコンポーネント
 */
export const Layer = (props: LayerProps) => {
    const { rendererProps, onUpdate, onDelete } = props;

    // 編集機能コンポーネントを移動可能にするための諸々をカスタムフックから取得
    const editorRef = useRef<HTMLDivElement>(null);
    const { position, handleDragStart } = useDrag({ ref: editorRef });

    // 各stateのセッター関数をラップして、onUpdateを呼び出すためのファクトリ
    const createSetter = <K extends keyof GradientNoiseStyle>(key: K): Dispatch<SetStateAction<GradientNoiseStyle[K]>> => {
        return (valueOrFn) => {
            const newValue =
                typeof valueOrFn === "function"
                    ? valueOrFn(rendererProps[key]) // セッターに渡されたものが関数なら実行
                    : valueOrFn; // 値ならそのまま使用
            onUpdate(rendererProps.id, { [key]: newValue });
        };
    };

    const editorProps = {
        ...rendererProps,
        onGrab: handleDragStart,
        onDelete: () => onDelete(rendererProps.id),
        setIsNoiseEnabled: createSetter("isNoiseEnabled"),
        setIsFogEnabled: createSetter("isFogEnabled"),
        setNoiseOpacity: createSetter("noiseOpacity"),
        setNoiseDensity: createSetter("noiseDensity"),
        setTurbulenceType: createSetter("turbulenceType"),
        setNumOctaves: createSetter("numOctaves"),
        setSeed: createSetter("seed"),
        setStitchTiles: createSetter("stitchTiles"),
        setFogOpacity: createSetter("fogOpacity"),
        setFogColor: createSetter("fogColor"),
        setFogWidth: createSetter("fogWidth"),
        setFogHeight: createSetter("fogHeight"),
        setFogBlur: createSetter("fogBlur"),
        setFogShape: createSetter("fogShape"),
        setFogPosition: createSetter("fogPosition"),
        setFogEnd: createSetter("fogEnd"),
    };

    return (
        <>
            {/* 編集機能コンポーネント */}
            <div
                ref={editorRef}
                className="fixed z-10" // ドラッグで自由に移動可にするためのfixed
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            >
                <GradientNoiseEditor {...editorProps} />
            </div>

            {/* 背景要素コンポーネント */}
            <div className="pointer-events-none fixed -z-10 inset-0">
                <GradientNoiseRenderer {...rendererProps} />
            </div>
        </>
    );
};
