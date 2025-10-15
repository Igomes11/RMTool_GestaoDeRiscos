import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RiscosTable from "./components/RiscosTable";
import AddRiscoForm from "./components/AddRiscoForm";

/*
  Estado global simples mantido aqui (App).
  Em produção você pode mover pra Context or Redux e conectar API.
*/

const initialRiscos = [
  {
    id: "R01",
    nome: "VULNERABILIDADE DO SISTEMA",
    descricao:
      "Uma versão antiga do servidor web está desprotegida contra ataques de negação de serviço (DDoS).",
    categoria: "SEGURANÇA",
    tecnologia: "Servidor Web",
  },
  { id: "R02", nome: "FALHA NA INTEGRAÇÃO", descricao: "DESCRIÇÃO", categoria: "ANÁLISE DE DADOS", tecnologia: "API interna" },
  { id: "R03", nome: "ATAQUE DE PHISHING", descricao: "DESCRIÇÃO", categoria: "SEGURANÇA", tecnologia: "Email" },
  { id: "R04", nome: "VAZAMENTO DE CREDENCIAIS", descricao: "DESCRIÇÃO", categoria: "SEGURANÇA", tecnologia: "Banco de Dados" },
];

export default function App() {
  const [riscos, setRiscos] = useState(initialRiscos);
  const navigate = useNavigate();

  const handleAdd = (newRisco) => {
    // gera novo id simples
    const nextId = `R${String(riscos.length + 1).padStart(2, "0")}`;
    setRiscos((prev) => [...prev, { ...newRisco, id: nextId }]);
    navigate("/riscos");
  };

  const handleUpdate = (updated) => {
    setRiscos((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    navigate("/riscos");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remover esse risco?")) return;
    setRiscos((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<RiscosTable riscos={riscos} onDelete={handleDelete} />}
        />
        <Route
          path="/riscos"
          element={<RiscosTable riscos={riscos} onDelete={handleDelete} />}
        />
        <Route
          path="/adicionar-risco"
          element={<AddRiscoForm onSave={handleAdd} />}
        />
        <Route
          path="/editar-risco/:id"
          element={<AddRiscoForm riscos={riscos} onSave={handleUpdate} />}
        />
        <Route path="*" element={<RiscosTable riscos={riscos} onDelete={handleDelete} />} />
      </Routes>
    </>
  );
}
