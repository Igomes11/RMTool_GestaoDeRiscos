import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importando para estética moderna

export default function AddTecnologiaForm({ onSave, tecnologias = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Edição via state ou via URL
  const editingFromState = location.state && location.state.tecnologia;
  const editingFromParams =
    params.id && tecnologias.find((t) => t.id === params.id);

  // useMemo para garantir que o objeto inicial não mude a cada renderização
  const initial = useMemo(() => {
    return (
      editingFromState ||
      editingFromParams || {
        nome: "",
        categoria: "", // Novo campo
        descricao: "",
      }
    );
  }, [editingFromState, editingFromParams]);

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({}); // Estado para mensagens de erro

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  // Opções modernas para o Select
  const categoryOptions = [
    { value: "Linguagem", label: "Linguagem de Programação" },
    { value: "Framework", label: "Framework / Biblioteca" },
    { value: "Banco de Dados", label: "Banco de Dados" },
    { value: "Cloud/Infra", label: "Cloud & Infraestrutura" },
    { value: "Ferramenta", label: "Ferramenta / Utilitário" },
    { value: "Outros", label: "Outros" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    // Limpa o erro ao digitar
    if (errors[name]) setErrors((s) => ({ ...s, [name]: "" }));
  }

  // Handler específico para o React Select
  function handleSelectChange(selectedOption) {
    setForm((s) => ({
      ...s,
      categoria: selectedOption ? selectedOption.value : "",
    }));
    if (errors.categoria) setErrors((s) => ({ ...s, categoria: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const newErrors = {};
    let hasError = false;

    // Validação
    if (!form.nome.trim()) {
      newErrors.nome = "⚠️ O nome da tecnologia é obrigatório.";
      hasError = true;
    }
    
    if (!form.categoria) {
      newErrors.categoria = "⚠️ Selecione uma categoria.";
      hasError = true;
    }

    if (!form.descricao.trim()) {
      newErrors.descricao = "⚠️ A descrição é obrigatória.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Envia se estiver tudo ok
    onSave(form);
  }

  return (
    <main className="page-tecnologia">
      <div className="container card-tecnologia">
        <h2 className="form-title-tecnologia">
          {form.id ? "EDITAR TECNOLOGIA" : "ADICIONAR TECNOLOGIA"}
        </h2>

        <form onSubmit={handleSubmit} className="form">
          {/* GRUPO: NOME E CATEGORIA */}
          <div className="section-two-cols">
            
            {/* CAMPO NOME */}
            <div className="col">
              <label className="section-label">NOME DA TECNOLOGIA:</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={`input ${errors.nome ? "input-error" : ""}`}
                placeholder="Ex: React, Python..."
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            {/* CAMPO CATEGORIA (React Select) */}
            <div className="col">
              <label className="section-label">CATEGORIA:</label>
              <Select
                options={categoryOptions}
                placeholder="Selecione..."
                className={`react-select-container ${errors.categoria ? "input-error-border" : ""}`}
                classNamePrefix="react-select"
                // Mapeia o valor simples (string) de volta para o objeto {value, label} que o Select espera
                value={categoryOptions.find((c) => c.value === form.categoria)}
                onChange={handleSelectChange}
              />
              {errors.categoria && <span className="error-message">{errors.categoria}</span>}
            </div>
          </div>

          {/* CAMPO DESCRIÇÃO */}
          <div className="section">
            <label className="section-label">DESCRIÇÃO / DETALHES:</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className={`textarea ${errors.descricao ? "input-error" : ""}`}
              rows="4"
            />
            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
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
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}