'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
    label: string
    options: string[]
    value?: string
    onChange?: (val: string) => void
}

const FormDropdown = ({ label, options, value, onChange }: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-4 rounded-lg border border-white/20 bg-transparent text-white/50 text-sm hover:border-white/40 transition"
            >
                <span className={value ? 'text-white' : ''}>{value || label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <ul className="absolute z-50 mt-1 w-full rounded-lg border border-white/20 bg-primaryColor shadow-xl overflow-hidden">
                    {options.map((opt) => (
                        <li
                            key={opt}
                            onClick={() => { onChange?.(opt); setOpen(false) }}
                            className="px-4 py-3 text-sm text-white/70 hover:bg-white/10 cursor-pointer transition"
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FormDropdown