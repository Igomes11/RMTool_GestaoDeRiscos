import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RiscosTable from "./components/RiscosTable";
import AddRiscoForm from "./components/AddRiscoForm";

/*
  Estado global simples mantido aqui (App).
  Em produção você pode mover pra Context or Redux e conectar API.
*/


export default function App() {
  const [riscos, setRiscos] = useState(() => {
    const saved = localStorage.getItem("riscos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("riscos", JSON.stringify(riscos));
  }, [riscos]);

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
        <Route
          path="*"
          element={<RiscosTable riscos={riscos} onDelete={handleDelete} />}
        />
      </Routes>
    </>
  );
}
