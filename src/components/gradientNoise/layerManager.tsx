"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getLayerInfoListFromUrl } from "~/lib/client/getLayerInfoListFromUrl";
import { useDebounce } from "~/lib/client/useDebounce";
import { createDefaultLayerInfo } from "~/lib/createDefaultLayerInfo";
import type { GradientNoiseStyle, LayerInfo } from "~/lib/types";
import { Layer } from "./layer";

/**
 * 複数の背景エディタとプレビューを管理するキャンバスコンポーネント
 */
export const LayerManager = () => {
    // 訪問直後は空配列で初期化
    const [layerInfoList, setLayerInfoList] = useState<LayerInfo[]>([]);

    // urlから状態を復元するイニシャライズ処理（マウント後に一度だけ実行）
    useEffect(() => {
        // urlのパラメータからレイヤー作成を試みる
        const layerInfoListFromUrl = getLayerInfoListFromUrl();

        // urlにパラメータがあれば、それを使う
        if (layerInfoListFromUrl) {
            const initialInfo: LayerInfo[] = layerInfoListFromUrl.map((urlLayerData, index) => {
                const defaultLayerInfo = createDefaultLayerInfo(index);
                return { ...defaultLayerInfo, ...urlLayerData, id: index };
            });
            setLayerInfoList(initialInfo);
        }
        // urlにパラメータがなければ、デフォルトのレイヤーを1つ作成
        else {
            setLayerInfoList([createDefaultLayerInfo(0)]);
        }
    }, []);

    // urlを遅延で更新する関数
    const updateUrl = useDebounce((updatedLayers: LayerInfo[]) => {
        // 初期化前の空配列状態ではurlを更新しない
        if (updatedLayers.length === 0) return;

        // urlに反映させるparams作成
        const params = new URLSearchParams();
        let idx = 0;
        for (const layer of updatedLayers) {
            const currentLayerData = { ...layer, id: idx };
            for (const [key, value] of Object.entries(currentLayerData)) {
                if (key === "id") continue;
                params.set(`l${idx}_${key}`, String(value));
            }
            idx++;
        }

        // url書き換え（画面更新は実行されない）
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, 500);

    // layerInfoListの状態が変化したときに、urlのクエリパラメータを更新する副作用
    useEffect(() => {
        updateUrl(layerInfoList);
    }, [layerInfoList, updateUrl]);

    /**
     * レイヤー追加ボタン押下イベントハンドラ
     */
    const handleAddLayer = () => {
        setLayerInfoList((prevInfo) => {
            const newId = prevInfo.length;
            return [...prevInfo, createDefaultLayerInfo(newId)];
        });
    };

    /**
     * 指定されたidのレイヤーを更新する関数
     */
    const handleUpdateLayer = (id: number, newProps: Partial<GradientNoiseStyle>) => {
        setLayerInfoList((prevInfo) => {
            return prevInfo.map((layer) => {
                return layer.id === id
                    ? { ...layer, ...newProps } // 当該idのレイヤー更新
                    : layer; // 他のレイヤーは維持
            });
        });
    };

    /**
     * 指定されたidのレイヤーを削除する関数
     */
    const handleDeleteLayer = (idToDelete: number) => {
        setLayerInfoList((prevInfo) => {
            return prevInfo
                .filter((layer) => layer.id !== idToDelete) //
                .map((layer, index) => ({ ...layer, id: index }));
        });
    };

    return (
        <div className="relative w-full h-full">
            {/* レイヤー追加ボタン */}
            <div className="fixed bottom-4 right-4 z-20">
                <button //
                    title="新しいレイヤーを追加"
                    type="button"
                    onClick={handleAddLayer}
                    className="btn btn-primary btn-circle shadow-lg"
                >
                    <FaPlus size={20} />
                </button>
            </div>

            {/* 各レイヤー描画 */}
            {layerInfoList.map((layerInfo) => (
                <Layer //
                    key={layerInfo.id}
                    rendererProps={layerInfo}
                    onUpdate={handleUpdateLayer}
                    onDelete={handleDeleteLayer}
                />
            ))}
        </div>
    );
};
