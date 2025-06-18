"use client";

import type { CSSProperties } from "react";
import type { LayerInfo } from "~/lib/types";

/**
 * 背景を装飾するコンポーネント
 */
export const GradientNoiseRenderer = (props: LayerInfo) => {
    const { id, isNoiseEnabled, isFogEnabled, noiseOpacity, noiseDensity, fogOpacity, fogColor, fogWidth, fogHeight, fogBlur, fogShape, fogPosition, fogEnd } = props;

    // もやもやグラデーションに適用するインラインスタイル
    const fogStyle: CSSProperties = {
        width: `${fogWidth}rem`,
        height: `${fogHeight}rem`,
        filter: `blur(${fogBlur}rem)`,
        opacity: fogOpacity,
        backgroundImage: `radial-gradient(${fogShape} at ${fogPosition}, ${fogColor}, transparent ${fogEnd}%)`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transitionProperty: "all",
        transitionDuration: "200ms",
    };

    // ノイズをグラデーションと同じ形状で重ねるためのスタイル
    const noiseOverlayStyle: CSSProperties = {
        // 画面中央に配置
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        // svgフィルターを適用してノイズを生成
        filter: `url(#noise-filter-svg-${id})`,

        // もやもやグラデーションレイヤーと自然に合成する
        mixBlendMode: "overlay",

        // ノイズの透明度
        opacity: noiseOpacity,
        transition: "opacity 200ms",

        // もやもやグラデーションの形状でノイズレイヤーをマスクする
        maskImage: `radial-gradient(${fogShape} at ${fogPosition}, black, transparent ${fogEnd}%)`,
        WebkitMaskImage: `radial-gradient(${fogShape} at ${fogPosition}, black, transparent ${fogEnd}%)`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "cover",
        WebkitMaskSize: "cover",
    };

    return (
        <>
            {/* フィルター定義専用のsvg（画面には非表示） */}
            <svg //
                id="noiseDefinition"
                width="0"
                height="0"
                className="absolute pointer-events-none"
            >
                <title>noise filter</title>
                <defs>
                    <filter id={`noise-filter-svg-${id}`}>
                        <feTurbulence //
                            baseFrequency={noiseDensity}
                            numOctaves="1"
                            stitchTiles="stitch"
                            type="fractalNoise"
                            result="turbulence"
                        />
                    </filter>
                </defs>
            </svg>

            {/* もやもやグラデーション上に重ねるノイズレイヤー */}
            {isNoiseEnabled && (
                <div //
                    id="noiseOverlay"
                    style={noiseOverlayStyle}
                    className="pointer-events-none"
                />
            )}

            {/* もやもやグラデーション本体 */}
            {isFogEnabled && <div id="moyamoya" style={fogStyle} />}
        </>
    );
};
