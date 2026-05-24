import { Button } from "../ui/button"

function CustomButton({ label, className, icon, onClick, type = "button", disabled }: { label: string, className?: string, icon?: React.ReactNode, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  return (

    <Button type={type} disabled={disabled} className={`cursor-pointer rounded-md ${className}`} onClick={onClick}>{label} {icon && icon}</Button>

  )
}

export default CustomButton
