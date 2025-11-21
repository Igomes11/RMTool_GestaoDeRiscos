import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

import DeleteModal from "./components/DeleteModal";

import Navbar from "./components/Navbar";

// Riscos
import RiscosTable from "./components/riscos/RiscosTable";
import AddRiscoForm from "./components/riscos/AddRiscoForm";

// Tecnologias
import TecnologiasTable from "./components/tecnologias/TecnologiasTable";
import AddTecnologiaForm from "./components/tecnologias/AddTecnologiaForm";

export default function App() {
  const navigate = useNavigate();

  // ===================== MODAL DE EXCLUSÃO =====================
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [onConfirmDelete, setOnConfirmDelete] = useState(null);

  // ===================== RISCOS =====================
  const [riscos, setRiscos] = useState([]);

  const handleAddRisco = (newRisco) => {
    const nextId = `R${String(riscos.length + 1).padStart(2, "0")}`;
    setRiscos((prev) => [...prev, { ...newRisco, id: nextId }]);
    navigate("/riscos");
  };

  const handleUpdateRisco = (updated) => {
    setRiscos((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    navigate("/riscos");
  };

  const handleDeleteRisco = (id) => {
    const confirm = () => {
      setRiscos((prev) => prev.filter((r) => r.id !== id));
    };
    openDeleteModal(confirm);
  };

  // ===================== TECNOLOGIAS =====================
  const [tecnologias, setTecnologias] = useState([]);

  const handleAddTecnologia = (tec) => {
    const nextId = `TEC${String(tecnologias.length + 1).padStart(3, "0")}`;
    setTecnologias((prev) => [...prev, { ...tec, id: nextId }]);
    navigate("/tecnologias");
  };

  const handleUpdateTecnologia = (tecAtualizada) => {
    setTecnologias((prev) =>
      prev.map((t) => (t.id === tecAtualizada.id ? tecAtualizada : t))
    );
    navigate("/tecnologias");
  };

  const handleDeleteTecnologia = (id) => {
    const confirm = () => {
      setTecnologias((prev) => prev.filter((t) => t.id !== id));
    };
    openDeleteModal(confirm);
  };

  // ===================== FUNÇÕES DO MODAL =====================
  const openDeleteModal = (confirmCallback) => {
    setOnConfirmDelete(() => confirmCallback); // Armazena a função de exclusão específica
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* RISCOS */}
        <Route
          path="/"
          element={<RiscosTable riscos={riscos} onDelete={handleDeleteRisco} />}
        />
        <Route
          path="/riscos"
          element={<RiscosTable riscos={riscos} onDelete={handleDeleteRisco} />}
        />
        <Route
          path="/adicionar-risco"
          element={<AddRiscoForm riscos={riscos} onSave={handleAddRisco} />}
        />
        <Route
          path="/riscos/editar/:id"
          element={<AddRiscoForm riscos={riscos} onSave={handleUpdateRisco} />}
        />

        {/* TECNOLOGIAS */}
        <Route
          path="/tecnologias"
          element={
            <TecnologiasTable
              tecnologias={tecnologias}
              onDelete={handleDeleteTecnologia}
            />
          }
        />
        <Route
          path="/tecnologias/adicionar"
          element={<AddTecnologiaForm onSave={handleAddTecnologia} />}
        />
        <Route
          path="/tecnologias/editar/:id"
          element={
            <AddTecnologiaForm
              tecnologias={tecnologias}
              onSave={handleUpdateTecnologia}
            />
          }
        />

        {/* fallback */}
        <Route
          path="*"
          element={<RiscosTable riscos={riscos} onDelete={handleDeleteRisco} />}
        />
      </Routes>

      <DeleteModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}
