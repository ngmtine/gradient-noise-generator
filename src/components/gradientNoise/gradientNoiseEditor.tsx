"use client";

// biome-ignore format:
import { FaArrowsAltH, FaArrowsAltV, FaChevronDown, FaChevronUp, FaExpand, FaEyeDropper, FaLayerGroup, FaMapMarkerAlt, FaPalette, FaRandom, FaSeedling, FaSun, FaThLarge, FaToggleOn, FaTrash, FaVectorSquare, FaWrench } from "react-icons/fa";

import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import { useState } from "react";
import type { FogPosition, FogShape, StitchTiles, TurbulenceType } from "~/lib/types";
import { SelectControl, SliderControl, ToggleControl } from "../controls";

interface GradientNoiseEditorProps {
    id: number;
    onGrab: (e: MouseEvent<HTMLDivElement>) => void; // ドラッグイベントハンドラ
    onDelete: () => void; // 削除イベントハンドラ
    isNoiseEnabled: boolean;
    setIsNoiseEnabled: Dispatch<SetStateAction<boolean>>;
    isFogEnabled: boolean;
    setIsFogEnabled: Dispatch<SetStateAction<boolean>>;
    noiseOpacity: number;
    setNoiseOpacity: Dispatch<SetStateAction<number>>;
    noiseDensity: number;
    setNoiseDensity: Dispatch<SetStateAction<number>>;
    turbulenceType: TurbulenceType;
    setTurbulenceType: Dispatch<SetStateAction<TurbulenceType>>;
    numOctaves: number;
    setNumOctaves: Dispatch<SetStateAction<number>>;
    seed: number;
    setSeed: Dispatch<SetStateAction<number>>;
    stitchTiles: StitchTiles;
    setStitchTiles: Dispatch<SetStateAction<StitchTiles>>;
    fogOpacity: number;
    setFogOpacity: Dispatch<SetStateAction<number>>;
    fogColor: string;
    setFogColor: Dispatch<SetStateAction<string>>;
    fogWidth: number;
    setFogWidth: Dispatch<SetStateAction<number>>;
    fogHeight: number;
    setFogHeight: Dispatch<SetStateAction<number>>;
    fogBlur: number;
    setFogBlur: Dispatch<SetStateAction<number>>;
    fogShape: FogShape;
    setFogShape: Dispatch<SetStateAction<FogShape>>;
    fogPosition: FogPosition;
    setFogPosition: Dispatch<SetStateAction<FogPosition>>;
    fogEnd: number;
    setFogEnd: Dispatch<SetStateAction<number>>;
}

/**
 * 背景スタイルを編集するためのUIコンポーネント
 */
export const GradientNoiseEditor = (props: GradientNoiseEditorProps) => {
    // biome-ignore format:
    const {
        id,
        onGrab,
        onDelete,
        isNoiseEnabled, setIsNoiseEnabled,
        isFogEnabled, setIsFogEnabled,
        noiseOpacity, setNoiseOpacity,
        noiseDensity, setNoiseDensity,
        turbulenceType, setTurbulenceType,
        numOctaves, setNumOctaves,
        seed, setSeed,
        stitchTiles, setStitchTiles,
        fogOpacity, setFogOpacity,
        fogColor, setFogColor,
        fogWidth, setFogWidth,
        fogHeight, setFogHeight,
        fogBlur, setFogBlur,
        fogShape, setFogShape,
        fogPosition, setFogPosition,
        fogEnd, setFogEnd,
    } = props;

    // 折りたたみ状態を管理するstate
    const [isHidden, setIsHidden] = useState(false);

    // 折りたたみボタンのクリックハンドラ
    const handleCollapseToggle = () => {
        setIsHidden((prev) => !prev);
    };

    // スライダーのイベントハンドラ
    const handleRangeChange = (setter: Dispatch<SetStateAction<number>>, isPercentage = false) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            return setter(isPercentage ? value / 100 : value);
        };
    };

    // トグルボタンのイベントハンドラ
    const handleToggleChange = (setter: Dispatch<SetStateAction<boolean>>) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            return setter(e.target.checked);
        };
    };

    return (
        <div className="card bg-base-200/80 backdrop-blur-sm shadow-xl w-full max-w-md">
            <div className="card-body">
                {/* ヘッダ部 */}
                <div className="flex justify-between items-center -mt-3">
                    <div //
                        onMouseDown={onGrab}
                        className="card-title text-base-content cursor-move"
                        style={{ userSelect: "none" }}
                    >
                        🎨 Style Editor #{id}
                    </div>
                    <div className="flex items-center">
                        <button //
                            type="button"
                            onClick={onDelete}
                            className="btn btn-ghost btn-sm btn-circle"
                            title="このレイヤーを削除"
                            aria-label="Delete this layer"
                        >
                            <FaTrash size={16} className="text-error" />
                        </button>

                        <button
                            type="button"
                            onClick={handleCollapseToggle}
                            className="btn btn-ghost btn-sm btn-circle"
                            title={isHidden ? "エディタを開く" : "エディタを折りたたむ"}
                            aria-label={isHidden ? "Expand editor" : "Collapse editor"}
                        >
                            {isHidden ? <FaChevronDown size={16} /> : <FaChevronUp size={16} />}
                        </button>
                    </div>
                </div>

                {/* パラメータ類 */}
                <div
                    className={`grid transition-all duration-300 ease-in-out
                        ${isHidden ? "hidden" : ""}
                    `}
                >
                    <div className="divider text-xs my-auto">Noise Filter</div>

                    <ToggleControl //
                        id="noise-toggle"
                        label="Noise Enabled"
                        icon={<FaToggleOn />}
                        checked={isNoiseEnabled}
                        onChange={handleToggleChange(setIsNoiseEnabled)}
                    />
                    <SliderControl //
                        id="noiseOpacity"
                        label="Noise Opacity"
                        icon={<FaSun />}
                        value={Math.round(noiseOpacity * 100)}
                        min={0}
                        max={100}
                        onChange={handleRangeChange(setNoiseOpacity, true)}
                    />
                    <SliderControl //
                        id="noiseDensity"
                        label="Noise Density"
                        icon={<FaRandom />}
                        value={noiseDensity}
                        min={0.1}
                        max={2}
                        step={0.1}
                        onChange={handleRangeChange(setNoiseDensity)}
                    />
                    <SelectControl //
                        id="turbulenceType"
                        label="Turbulence Type"
                        icon={<FaWrench />}
                        value={turbulenceType}
                        onChange={(e) => setTurbulenceType(e.target.value as TurbulenceType)}
                        options={[
                            { value: "fractalNoise", label: "Fractal Noise" },
                            { value: "turbulence", label: "Turbulence" },
                        ]}
                    />
                    <SliderControl //
                        id="numOctaves"
                        label="Num Octaves"
                        icon={<FaLayerGroup />}
                        value={numOctaves}
                        unit=""
                        min={1}
                        max={10}
                        step={1}
                        onChange={handleRangeChange(setNumOctaves)}
                    />
                    <SliderControl //
                        id="seed"
                        label="Seed"
                        icon={<FaSeedling />}
                        value={seed}
                        unit=""
                        min={0}
                        max={100}
                        step={1}
                        onChange={handleRangeChange(setSeed)}
                    />
                    <SelectControl //
                        id="stitchTiles"
                        label="Stitch Tiles"
                        icon={<FaVectorSquare />}
                        value={stitchTiles}
                        onChange={(e) => setStitchTiles(e.target.value as StitchTiles)}
                        options={[
                            { value: "stitch", label: "Stitch" },
                            { value: "noStitch", label: "No Stitch" },
                        ]}
                    />

                    <div className="divider text-xs my-auto">Fog Gradient</div>
                    <ToggleControl //
                        id="fog-toggle"
                        label="Fog Enabled"
                        icon={<FaToggleOn />}
                        checked={isFogEnabled}
                        onChange={handleToggleChange(setIsFogEnabled)}
                    />
                    <SliderControl
                        id="fogOpacity"
                        label="Fog Opacity"
                        icon={<FaEyeDropper />}
                        value={Math.round(fogOpacity * 100)}
                        min={0}
                        max={100}
                        onChange={handleRangeChange(setFogOpacity, true)}
                        color="secondary"
                    />
                    <SliderControl //
                        id="fogWidth"
                        label="Fog Width"
                        icon={<FaArrowsAltH />}
                        value={fogWidth}
                        unit="rem"
                        min={10}
                        max={100}
                        onChange={handleRangeChange(setFogWidth)}
                        color="accent"
                    />
                    <SliderControl //
                        id="fogHeight"
                        label="Fog Height"
                        icon={<FaArrowsAltV />}
                        value={fogHeight}
                        unit="rem"
                        min={10}
                        max={100}
                        onChange={handleRangeChange(setFogHeight)}
                        color="info"
                    />
                    <SliderControl //
                        id="fogBlur"
                        label="Fog Blur"
                        icon={<FaExpand />}
                        value={fogBlur}
                        unit="rem"
                        min={1}
                        max={10}
                        step={0.5}
                        onChange={handleRangeChange(setFogBlur)}
                        color="warning"
                    />
                    <SliderControl //
                        id="fogEnd"
                        label="Gradient End"
                        icon={<FaPalette />}
                        value={fogEnd}
                        unit="%"
                        min={0}
                        max={100}
                        onChange={handleRangeChange(setFogEnd)}
                        color="primary"
                    />
                    <SelectControl
                        id="fogShape"
                        label="Gradient Shape"
                        icon={<FaThLarge />}
                        value={fogShape}
                        onChange={(e) => setFogShape(e.target.value as FogShape)}
                        options={[
                            { value: "ellipse", label: "Ellipse" },
                            { value: "circle", label: "Circle" },
                        ]}
                    />
                    <SelectControl
                        id="fogPosition"
                        label="Gradient Position"
                        icon={<FaMapMarkerAlt />}
                        value={fogPosition}
                        onChange={(e) => setFogPosition(e.target.value as FogPosition)}
                        options={[
                            { value: "bottom right", label: "Bottom Right" },
                            { value: "bottom left", label: "Bottom Left" },
                            { value: "top right", label: "Top Right" },
                            { value: "top left", label: "Top Left" },
                            { value: "center", label: "Center" },
                        ]}
                    />

                    {/* Fog Color */}
                    <div className="form-control">
                        <label htmlFor="fogColor" className="label cursor-pointer">
                            <span className="label-text flex items-center gap-2">
                                <FaPalette /> Fog Color
                            </span>
                            <input //
                                id="fogColor"
                                type="color"
                                value={fogColor}
                                onChange={(e) => setFogColor(e.target.value)}
                                className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
