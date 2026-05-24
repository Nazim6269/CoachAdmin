import { useState } from "react";

const useModal = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);
    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((p) => !p),
    };
};

export default useModal;

// const useModal = (initial = false) => {
//   const [isOpen, setIsOpen] = useState(initial);
//   const modalRef = useRef(null);

//   const open = useCallback(() => setIsOpen(true), []);
//   const close = useCallback(() => setIsOpen(false), []);
//   const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

//   // close on ESC
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") close();
//     };

//     if (isOpen) {
//       window.addEventListener("keydown", handleEsc);
//     }

//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [isOpen, close]);

//   // close on outside click
//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         close();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }

//     return () =>
//       document.removeEventListener("mousedown", handleOutsideClick);
//   }, [isOpen, close]);

//   return {
//     isOpen,
//     open,
//     close,
//     toggle,
//     modalRef,
//   };
// };

// export default useModal;