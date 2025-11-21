import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function AddRiscoForm({ onSave, riscos = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // tenta obter dados do estado da navegação (edição via tabela) ou dos params (edição via URL)
  const editingFromState = location.state && location.state.risco;
  const editingFromParams = params.id && riscos.find((r) => r.id === params.id);

  const initial = React.useMemo(() => {
    return (
      editingFromState ||
      editingFromParams || {
        nome: "",
        categoria: "",
        descricao: "",
        tecnologia: [],
        nivelRisco: "",
      }
    );
  }, [editingFromState, editingFromParams]);

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [location, params, initial]);

  const categoryOptions = [
    { value: "SEGURANÇA", label: "Segurança" },
    { value: "ANÁLISE DE DADOS", label: "Análise de Dados" },
    { value: "OPERACIONAL", label: "Operacional" },
    { value: "LEGAL", label: "Legal" },
    { value: "COMPLIANCE", label: "Compliance" },
    { value: "REPUTAÇÃO", label: "Reputação" },
    { value: "FINANCEIRO", label: "Financeiro" },
    { value: "OUTROS", label: "Outros" }
  ];

  const techOptions = [
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "MySQL", label: "MySQL" },
    { value: "Python", label: "Python" },
    { value: "AWS", label: "AWS" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
  ];

  const nivelRiscoOptions = [
    { value: "1", label: "Baixo" },
    { value: "2", label: "Médio" },
    { value: "3", label: "Alto" },
    { value: "4", label: "Crítico" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // Handler para o react-select
  function handleSelectChange(name, selected) {
    const value = Array.isArray(selected) ? selected.map((o) => o.value) : selected ? selected.value : "";
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
            <Select
              name="categoria"
              options={categoryOptions}
              className="input"
              classNamePrefix="react-select"
              placeholder="Selecione..."
              value={categoryOptions.find((c) => c.value === form.categoria)}
              onChange={(option) => handleSelectChange("categoria", option)}
            />
          </div>

          {/* TECNOLOGIA E NÍVEL */}
          <div className="section two-cols">
            <div className="col">
              <label className="section-label">TECNOLOGIA:</label>
              <Select
                name="tecnologia"
                isMulti
                options={techOptions}
                className="input"
                classNamePrefix="react-select"
                placeholder="Selecione..."
                value={techOptions.filter((opt) =>
                  form.tecnologia.includes(opt.value)
                )}
                onChange={(options) => handleSelectChange("tecnologia", options)}
              />
            </div>

            <div className="col">
              <label className="section-label">NÍVEL DO RISCO:</label>
              <Select
                name="nivelRisco"
                options={nivelRiscoOptions}
                className="input"
                classNamePrefix="react-select"
                placeholder="Selecione..."
                value={nivelRiscoOptions.find((o) => o.value === form.nivelRisco)}
                onChange={(option) => handleSelectChange("nivelRisco", option)}
              />
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
