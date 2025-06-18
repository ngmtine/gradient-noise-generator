import { parseValue } from "~/lib/parseValue";
import type { LayerInfo, GradientNoiseStyle } from "~/lib/types";

/**
 * urlのパラメータからレイヤー作成する関数
 */
export const getLayerInfoListFromUrl = (): Partial<LayerInfo>[] | undefined => {
    // urlからクエリパラメータ取得
    const params = new URLSearchParams(window.location.search);

    // レイヤーごとのスタイル情報を一時的に格納するオブジェクト
    const layersData: Record<number, Partial<GradientNoiseStyle>> = {};

    // urlパラメータに含まれる最大のレイヤーインデックスを追跡するための変数
    let maxIndex = -1;

    for (const [key, value] of params.entries()) {
        // l<数値>_<プロパティ名> という形式のキーにマッチするかの正規表現
        const match = key.match(/^l(\d+)_(.+)$/);
        if (!match) continue;

        // レイヤーのスタイル情報更新
        const index = Number(match[1]);
        const propName = match[2];
        if (index > maxIndex) maxIndex = index;
        if (!layersData[index]) layersData[index] = {};
        // biome-ignore lint/suspicious/noExplicitAny:
        (layersData[index] as any)[propName] = parseValue(value);
    }

    // 抽出したレイヤーデータのキー（url上のインデックス）を取得
    const foundIndices = Object.keys(layersData).map(Number);

    // urlにレイヤー関連のパラメータがなければundefiend返却
    if (foundIndices.length === 0) return undefined;

    // url上のインデックス順にソート、インデックスを詰める
    // 例：l0とl99が存在する場合に、l0とl1という様に詰める
    foundIndices.sort((a, b) => a - b);
    const compressedLayers: Partial<GradientNoiseStyle>[] = foundIndices.map((index) => layersData[index]);

    return compressedLayers;
};
