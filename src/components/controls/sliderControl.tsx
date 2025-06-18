"use client";

import type { ChangeEvent, ReactNode } from "react";

interface SliderControlProps {
    id: string;
    label: string;
    icon: ReactNode;
    value: number;
    unit?: string;
    min: number;
    max: number;
    step?: number;
    color?: "primary" | "secondary" | "accent" | "info" | "warning";
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SliderControl = (props: SliderControlProps) => {
    const { id, label, icon, value, unit = "%", min, max, step = 1, color = "primary", onChange } = props;

    return (
        <div className="form-control">
            <label htmlFor={id} className="label cursor-pointer">
                <span className="label-text flex items-center gap-2">
                    {icon} {label}
                </span>
                <span>
                    {value}
                    {unit}
                </span>
            </label>
            <input //
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className={`range range-sm range-${color}`}
            />
        </div>
    );
};

export default SliderControl;
