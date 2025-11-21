import React from "react";

export default function PageHeader({
  title,
  onAdd,
  addLabel = "Adicionar",
  showSearch = true,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="page-header">
      <h2 className="page-title">{title}</h2>

      <div className="page-header-actions">
        {showSearch && (
          <input
            className="page-search"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}

        {onAdd && (
          <button className="page-add-btn" onClick={onAdd}>
            + {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
