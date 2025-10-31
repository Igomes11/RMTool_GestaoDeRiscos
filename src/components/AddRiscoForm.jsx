import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

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
    tecnologia: [],
    nivelRisco: "",
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [location, params]);

  const techOptions = [
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "MySQL", label: "MySQL" },
    { value: "Python", label: "Python" },
    { value: "AWS", label: "AWS" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" }, 
  ];

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
          {/* NOME E CATEGORIA */}
          <div className="section two-cols">
            <label className="section-label">RISCO:</label>
            <label className="section-label">CATEGORIA:</label>

            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="input"
            />
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="input"
            >
              <option value="">Selecione...</option>
              <option>SEGURANÇA</option>
              <option>ANÁLISE DE DADOS</option>
              <option>OPERACIONAL</option>
              <option>OUTROS</option>
              <option>LEGAL</option>
              <option>COMPLIANCE</option>
              <option>REPUTAÇÃO</option>
              <option>FINANCEIRO</option>
            </select>
          </div>

          {/* TECNOLOGIA E NÍVEL */}
          <div className="section two-cols">
            <div className="col">
              <label className="section-label">TECNOLOGIA:</label>
              <Select
                isMulti
                name="tecnologia"
                options={techOptions}
                className="input"
                placeholder="Selecione..."
                value={techOptions.filter(opt =>
                  (form.tecnologia || []).includes(opt.value)
                )}
                onChange={(selected) =>
                  setForm({
                    ...form,
                    tecnologia: selected
                      ? selected.map((opt) => opt.value)
                      : [],
                  })
                }
              />
            </div>

            <div className="col">
              <label className="section-label">NÍVEL DO RISCO:</label>
              <select
                name="nivelRisco"
                value={form.nivelRisco}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecione...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="section">
            <label className="section-label">DESCRIÇÃO:</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          {/* BOTÕES */}
          <div className="form-actions">
            <button
              className="btn-cancel"
              type="button"
              onClick={() => navigate(-1)}
            >
              CANCELAR
            </button>
            <button className="btn-save" type="submit">
              SALVAR E CONTINUAR
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
