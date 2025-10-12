import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function ModalPlain({ show, onClose, title, children }) {
  useEffect(() => {
    console.log("ModalPlain renderizado: ", show);
  }, [show]);

  if (!show) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const modalStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "24px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    position: "relative",
    animation: "fadeIn 0.3s ease-out",
  };

  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div id="modal-plain-overlay" style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {title && (
          <h2 className="text-center text-blue-600 text-xl mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>,
    modalRoot
  );
}
