
/*
Accessible Modal Component Requirements:
- the element that will be our modal container needs to have role of dialog
- the modal container needs to have aria-modal set to true
- the modal container needs to have either aria-labelledby or aria-label
- clicking outside the modal (or backdrop) will close the modal
- keyboard interaction where:
    - Esc key closes the modal
    - pressing Shift moves the focus to the next tabbable element inside the modal
    - pressing Shift + Tab moves the focus to the previous tabbable element
- when open, interaction outside the modal should not be possible, such as scrolling
- focus should be trapped inside the modal
*/


import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import './Modal.css';
import FocusLock from 'react-focus-lock';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Modal = ({ isOpen, onClose, children, title, description }: ModalProps) => {
  // Close on ESC Keydown
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [onClose, isOpen]
  );

  // Disable Scrolling and Attach Keydown Listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup - Remove Listener and Enable Scrolling and avoid memory leaks
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;


  return createPortal(
    <FocusLock>
      <div
        className="modal-backdrop"
        onClick={onClose}
      >
        <div
          className="modal-content"
          aria-modal="true"
          role="dialog"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <h2 id="modal-title" className="mb-4 text-xl font-bold">
              {title}
            </h2>
          )}

          {description && (
            <p id="modal-description" className="mb-4 text-gray-700">
              {description}
            </p>
          )}
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close-btn absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        
          {children}
          
        </div>
      </div>
      </FocusLock>,
    document.body
  );
};

export default Modal;