"use client";

import type { ChangeEvent, ReactNode } from "react";

interface ToggleControlProps {
    id: string;
    label: string;
    icon: ReactNode;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleControl = (props: ToggleControlProps) => {
    const { id, label, icon, checked, onChange } = props;

    return (
        <div className="form-control">
            <label htmlFor={id} className="label cursor-pointer">
                <span className="label-text flex items-center gap-2">
                    {icon} {label}
                </span>
                <input //
                    id={id}
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default ToggleControl;
