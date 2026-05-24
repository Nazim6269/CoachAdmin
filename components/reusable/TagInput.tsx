'use client'
import { useState, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'

type Props = {
    placeholder?: string
    value: string[]
    onChange: (tags: string[]) => void
}

const TagInput = ({ placeholder = 'Input service name', value, onChange }: Props) => {
    const [input, setInput] = useState('')

    const addTag = () => {
        const trimmed = input.trim()
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed])
        }
        setInput('')
    }

    const removeTag = (tag: string) => onChange(value.filter(t => t !== tag))

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { e.preventDefault(); addTag() }
    }

    return (
        <div className="w-full">
            <div className="flex items-center px-4 py-3 rounded-lg border border-white/20 bg-transparent hover:border-white/40 transition">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
                <button type="button" onClick={addTag}>
                    <Plus className="w-4 h-4 text-white/50 hover:text-white transition" />
                </button>
            </div>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {value.map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-white/20 text-xs text-white/70">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)}>
                                <X className="w-3 h-3 hover:text-white transition" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TagInput