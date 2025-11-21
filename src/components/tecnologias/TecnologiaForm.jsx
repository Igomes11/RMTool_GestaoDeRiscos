import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TecnologiaForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    descricao: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    const errorMessage = document.getElementById("error-message"); // Assumindo que você tem um elemento com este ID
    
    if (!form.nome.value.trim()) {
        // Define o texto da mensagem
        errorMessage.textContent = "⚠️ Digite o nome da tecnologia.";
        // Torna o elemento visível (se estiver oculto por CSS)
        errorMessage.style.display = "block"; 
        // Interrompe a função
        return; 
    }

    // Se a validação passar, esconde a mensagem e continua com o envio
    errorMessage.textContent = ""; 
    errorMessage.style.display = "none";
    // ... código para enviar o formulário
}
    
    // TODO: Implementar salvamento
    console.log("Salvando tecnologia:", form);
    
    navigate(-1); // Volta para a página anterior
  }

  return (
    <main className="page">
      <div className="container card">
        <h2 className="form-title">ADICIONAR TECNOLOGIA</h2>

        <form onSubmit={submit} className="form">
          <div className="section two-cols">
            <div>
              <label className="section-label">TECNOLOGIA:</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="input"
                placeholder="Nome da tecnologia"
              />
            </div>
            <div>
              <label className="section-label">DESCRIÇÃO:</label>
              <input
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                className="input"
                placeholder="Descrição"
              />
            </div>
          </div>

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
