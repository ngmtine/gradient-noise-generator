import type { LayerInfo } from "./types";

/**
 * 新しいレイヤーのデフォルト設定を生成
 * @param id - 新しいレイヤーのid (数値)
 */
export const createDefaultLayerInfo = (id: number): LayerInfo => ({
    id,
    isNoiseEnabled: true,
    isFogEnabled: true,
    noiseOpacity: 0.15,
    noiseDensity: 0.9,
    turbulenceType: "fractalNoise",
    numOctaves: 1,
    seed: 0,
    stitchTiles: "stitch",
    fogOpacity: 0.5,
    fogColor: "#064e3b",
    fogWidth: 40,
    fogHeight: 40,
    fogBlur: 3,
    fogShape: "ellipse",
    fogPosition: "center",
    fogEnd: 80,
});
