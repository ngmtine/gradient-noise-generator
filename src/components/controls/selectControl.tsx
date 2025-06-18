"use client";

import type { ChangeEvent, ReactNode } from "react";

interface SelectControlProps {
    id: string;
    label: string;
    icon: ReactNode;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectControl = (props: SelectControlProps) => {
    const { id, label, icon, value, options, onChange } = props;

    return (
        <div className="form-control">
            <label htmlFor={id} className="label">
                <span className="label-text flex items-center gap-2">
                    {icon} {label}
                </span>
            </label>
            <select //
                id={id}
                className="select select-bordered select-sm w-full"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectControl;
