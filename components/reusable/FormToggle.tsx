'use client'

type Props = {
    label: string
    checked: boolean
    onChange: (val: boolean) => void
}

const FormToggle = ({ label, checked, onChange }: Props) => (
    <div className="flex items-center gap-3">
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-blue-500' : 'bg-white/20'}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
        <span className="text-sm text-white/70">{label}</span>
    </div>
)

export default FormToggle