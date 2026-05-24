const ModalBody = ({ children, className = "" }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`px-6 py-5 max-h-[60vh] overflow-y-auto ${className}`}>
        {children}
    </div>
);


export default ModalBody;