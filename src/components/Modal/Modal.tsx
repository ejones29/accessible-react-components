import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
// Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

 

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal content */}
      <div
        className="relative z-10 w-11/12 max-w-lg rounded bg-white p-6 shadow-lg"
        role="document"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {title && (
          <h2 id="modal-title" className="mb-4 text-xl font-bold">
            {title}
          </h2>
        )}
        
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
      

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;