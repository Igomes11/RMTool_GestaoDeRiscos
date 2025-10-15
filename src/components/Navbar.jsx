import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const active = (path) => (location.pathname === path ? "nav-link active" : "nav-link");

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-icon">
            {/* simples triângulos */}
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M2 2 L12 12 L2 22 z" fill="#d9b3ff" />
              <path d="M12 2 L22 12 L12 22 z" fill="#9b5cff" />
            </svg>
          </div>
          <div className="brand-text">RM Tool</div>
        </div>

        <nav className="main-nav">
          <Link className={active("/")} to="/riscos">Dashboard</Link>
          <Link className={active("/projetos")} to="/projetos">Projetos</Link>
          <Link className={active("/tecnologias")} to="/tecnologias">Tecnologias</Link>
          <Link className={active("/riscos")} to="/riscos">Riscos</Link>
        </nav>

        <div className="profile">
          <div className="avatar" />
          <div className="profile-name">Emanuel<br/>Dantas</div>
        </div>
      </div>
    </header>
  );
}
