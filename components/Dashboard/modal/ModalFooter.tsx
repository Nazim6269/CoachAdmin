// Footer — action buttons row
const ModalFooter = ({ children, align = "right", className }: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
}) => {
    const alignClass = { left: "justify-start", center: "justify-center", right: "justify-end" }[align];
    return (
        <div className={`px-6 py-4 border-t border-secondaryColor dark:border-white/10 flex gap-3 ${alignClass} ${className}`}>
            {children}
        </div>
    );
};


export default ModalFooter;
