import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AddRiscoForm({ onSave, riscos = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // tenta obter dados do estado da navegação (edição via tabela) ou dos params (edição via URL)
  
  const editingFromState = location.state && location.state.risco;
  
  const editingFromParams =
    params.id && riscos.find((r) => r.id === params.id);

  const initial = editingFromState || editingFromParams || {
    nome: "",
    categoria: "",
    descricao: "",
    tecnologia: "",
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  
  }, [location, params]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    // validação simples
    if (!form.nome.trim()) return alert("Digite o nome do risco.");
    if (!form.categoria.trim()) return alert("Selecione a categoria.");

    if (form.id) {
      onSave(form); // edição
    } else {
      onSave(form); // adição
    }
  }

  return (
    <main className="page">
      <div className="container card">
        <h2 className="form-title">EDITAR/ADICIONAR RISCOS</h2>

        <form onSubmit={submit} className="form">
          <div className="section two-cols">
            <label className="section-label">NOME DO RISCO:</label>
            <label className="section-label">CATEGORIA:</label>

            <input name="nome" value={form.nome} onChange={handleChange} className="input" />
            <select name="categoria" value={form.categoria} onChange={handleChange} className="input">
              <option value="">Selecione...</option>
              <option>SEGURANÇA</option>
              <option>ANÁLISE DE DADOS</option>
              <option>OPERACIONAL</option>
              <option>OUTROS</option>
              <option>LEGAL</option>
              <option>COMPLIANCE</option>
              <option>REPUTAÇÃO</option>
              <option>FINANCEIRO</option>
              <option>ESTRATÉGICO</option>
              <option>TECNOLOGIA</option>
              <option>PROJETO</option>
              <option>PESSOAS</option>
            </select>
          </div>

          <div className="section">
            <label className="section-label">TECNOLOGIA ATRELADA:</label>
            <select name="tecnologia" value={form.tecnologia} onChange={handleChange} className="input">
              <option value="">Selecione...</option>
              <option>React</option>
              <option>Node.js</option>
              <option>MySQL</option>
              <option>Python</option>
            </select>
          </div>

          <div className="section">
            <label className="section-label">DESCRIÇÃO:</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} className="textarea" />
          </div>

          <div className="form-actions">
            <button className="btn-cancel" type="button" onClick={() => navigate(-1)}>CANCELAR</button>
            <button className="btn-save" type="submit">SALVAR E CONTINUAR</button>
          </div>
        </form>
      </div>
    </main>
  );
}
