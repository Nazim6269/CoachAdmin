// Paragraph text
const ModalText = ({ children, className = "" }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <p className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${className}`}>
        {children}
    </p>
);

export default ModalText;
