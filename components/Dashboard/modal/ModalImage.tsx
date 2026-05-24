// Image block
const ModalImage = ({ src, alt, className = "" }: {
    src: string;
    alt: string;
    className?: string;
}) => (
    <div className={`w-full overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
);

export default ModalImage;