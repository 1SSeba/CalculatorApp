import { createPortal } from "react-dom";
import type { ReactNode, MouseEventHandler } from "react";
import "./ui.css";

export interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ onClose, title, children, footer }: ModalProps) {
  const handleOverlayClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-panel">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} title="Cerrar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
