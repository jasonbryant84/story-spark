import React from 'react'

interface ButtonType {
    label: string;
    onClick?: (e: React.FormEvent) => void;
    className?: string;
}

export default function Button(buttonInfo: ButtonType) {
    const { label, onClick, className = '' } = buttonInfo

    return (
        <button className={`rounded-[30px] ${className}`} onClick={onClick}>
            <span>{label}</span>
        </button>
    )
}
