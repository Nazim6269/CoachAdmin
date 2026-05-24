import { ReactNode } from 'react'

type Props = {
    label: string
    children: ReactNode
}

const FormField = ({ label, children }: Props) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-white/70">{label}</label>
        {children}
    </div>
)

export default FormField