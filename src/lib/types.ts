export type FogShape = "ellipse" | "circle";
export type FogPosition = "bottom right" | "bottom left" | "top right" | "top left" | "center";
export type TurbulenceType = "fractalNoise" | "turbulence";
export type StitchTiles = "stitch" | "noStitch";

/**
 * 背景レイヤーのスタイルプロパティを定義する型
 */
export interface GradientNoiseStyle {
    isNoiseEnabled: boolean; // ノイズの表示非表示
    isFogEnabled: boolean; // もやもやグラデーションの表示非表示
    noiseOpacity: number;
    noiseDensity: number;
    turbulenceType: TurbulenceType;
    numOctaves: number;
    seed: number;
    stitchTiles: StitchTiles;
    fogOpacity: number;
    fogColor: string;
    fogWidth: number;
    fogHeight: number;
    fogBlur: number;
    fogShape: FogShape;
    fogPosition: FogPosition;
    fogEnd: number;
}

/**
 * 背景レイヤーの状態を表す型 (スタイルに一意のidを追加)
 */
export type LayerInfo = GradientNoiseStyle & {
    id: number;
};
