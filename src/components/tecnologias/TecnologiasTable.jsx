// src/components/tecnologias/TecnologiasTable.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Ícones (iguais aos da tela de riscos) */
/* Ícones Modernos (Estilo Outline/Rounded) */

const IconSearch = () => (
  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconEdit = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8d4bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8d4bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

export default function TecnologiasTable({ tecnologias = [], onDelete }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = tecnologias.filter(t =>
    t.nome.toLowerCase().includes(query.toLowerCase()) ||
    t.descricao.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="page">
      <div className="container card">

        {/* 🟣 CONTROLS (iguais ao de riscos) */}
        <div className="controls">
          <div className="left-controls">
            <button className="filter-btn"><IconFilter /> <span>FILTRAR</span></button>
          </div>

          <div className="search-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              placeholder="Buscar tecnologia..."
            />
            <button className="search-btn" aria-label="Buscar"><IconSearch /></button>
          </div>

          <div className="add-btn-wrap">
            <button
              className="circle-add"
              title="Adicionar tecnologia"
              onClick={() => navigate("/tecnologias/adicionar")}
            >
              <div className="plus-dot" />
              <IconPlus />
            </button>
          </div>
        </div>

        {/* 🟣 TABELA (igual a de riscos) */}
        <table className="riscos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TECNOLOGIA</th>
              <th>DESCRIÇÃO</th>
              <th>EDITAR</th>
              <th>EXCLUIR</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "32px" }}>
                  Nenhuma tecnologia encontrada
                </td>
              </tr>
            ) : (
              filtered.map((tec) => (
                <tr key={tec.id}>
                  <td className="col-id">{tec.id}</td>
                  <td className="col-name">{tec.nome}</td>
                  <td className="col-desc">{tec.descricao}</td>

                  <td className="col-action">
                    <button
                      className="icon-btn"
                      onClick={() =>
                        navigate(`/tecnologias/editar/${tec.id}`, { state: { tecnologia: tec } })
                      }
                      title="Editar"
                    >
                      <IconEdit />
                    </button>
                  </td>

                  <td className="col-action">
                    <button className="icon-btn" onClick={() => onDelete(tec.id)} title="Remover">
                      <IconTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
