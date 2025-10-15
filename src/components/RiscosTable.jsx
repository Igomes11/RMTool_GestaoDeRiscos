import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Ícones simples em SVG para editar/deletar/buscar/filtro/plus */
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#111" d="M21 20l-5.6-5.6A7.5 7.5 0 1019.5 18.5L21 20zM5.5 11A5.5 5.5 0 1111 16.5 5.5 5.5 0 015.5 11z"/></svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#222" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
);
const IconEdit = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#8d4bff" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41L18.37 3.29a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#8d4bff" d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6v9h2V9H10z"/></svg>
);
const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#111" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm4 6h10v-2H7v2z"/></svg>
);

export default function RiscosTable({ riscos = [], onDelete }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = riscos.filter(r =>
    r.nome.toLowerCase().includes(query.toLowerCase()) ||
    r.descricao.toLowerCase().includes(query.toLowerCase()) ||
    r.categoria.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="page">
      <div className="container card">
        <div className="controls">
          <div className="left-controls">
            <button className="filter-btn"><IconFilter /> <span>FILTRAR</span></button>
          </div>
          <div className="search-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              placeholder="Buscar risco ou categoria..."
            />
            <button className="search-btn" aria-label="Buscar"><IconSearch /></button>
          </div>

          <div className="add-btn-wrap">
            <button
              className="circle-add"
              title="Adicionar risco"
              onClick={() => navigate("/adicionar-risco")}
            >
              <div className="plus-dot" />
              <IconPlus />
            </button>
          </div>
        </div>

        <table className="riscos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>DESCRIÇÃO</th>
              <th>CATEGORIA</th>
              <th>EDITAR</th>
              <th>REMOVER</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign:'center', padding: '32px'}}>Nenhum risco encontrado</td></tr>
            ) : filtered.map((r) => (
              <tr key={r.id}>
                <td className="col-id">{r.id}</td>
                <td className="col-name">{r.nome}</td>
                <td className="col-desc">{r.descricao}</td>
                <td className="col-cat">{r.categoria}</td>
                <td className="col-action">
                  <button
                    className="icon-btn"
                    onClick={() => navigate(`/editar-risco/${r.id}`, { state: { risco: r } })}
                    title="Editar"
                  >
                    <IconEdit />
                  </button>
                </td>
                <td className="col-action">
                  <button className="icon-btn" onClick={() => onDelete(r.id)} title="Remover">
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
