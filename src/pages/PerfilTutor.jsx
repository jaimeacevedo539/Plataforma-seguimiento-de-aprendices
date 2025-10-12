import React from "react";
import FormAprendiz from "../componentes/FormAprendiz";
import ListarAprendices from "../pages/ListarAprendices";
import RegistrarRetroalimentacion from "../pages/Retroalimentacion";
import ListarRetroalimentacion from "../pages/ListarRetroalimentacion";    
import { useNavigate } from "react-router-dom"; 



function PerfilTutor() {
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuario')) || null;
    } catch {
      return null;
    }
  })();

  //finalizar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
    };
    if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-xl font-semibold text-[#004481] mb-4">
          No has iniciado sesión
        </h2>
        <a href="/" className="text-blue-600 underline">
          Ir al inicio de sesión
        </a>
      </div>
    );
  }

     return (
    <div className="p-6">
      {/* 🔵 Navbar superior */}
      <nav className="bg-[#004481] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          
          <span className="text-lg font-semibold">Panel del Tutor</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="font-medium">
            👋 Hola, <span className="font-bold">{usuario?.nombre}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-[#009639] hover:bg-[#007f2d] text-white px-4 py-2 rounded-md font-semibold transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* 🔶 Contenido principal */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#004481] mb-6">
          Bienvenido al sistema de gestión
        </h2>

      {/* 🟢 Sección de gestión de aprendices */}
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-[#004481] mb-3">Registrar Aprendiz</h2>
          <FormAprendiz />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#004481] mb-3">Lista de Aprendices</h2>
          <ListarAprendices />
        </section>

        {/* 🟢 Sección de retroalimentaciones */}
        <section>
          <h2 className="text-xl font-semibold text-[#004481] mb-3">Registrar Retroalimentación</h2>
          <RegistrarRetroalimentacion />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#004481] mb-3">Lista de Retroalimentaciones</h2>
          <ListarRetroalimentacion />
        </section>
      </div>
    </div>
    </div>
  );
}

export default PerfilTutor;


