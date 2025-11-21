import React from "react";
import "../styles/DeleteModal.css";

export default function DeleteModal({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>{title || "Confirmar Exclusão"}</h3>
        <p>{message || "Tem certeza que deseja excluir este item?"}</p>

        <div className="delete-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-delete" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
