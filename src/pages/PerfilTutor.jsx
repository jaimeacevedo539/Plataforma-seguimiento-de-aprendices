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
    <div className="min-h-screen bg-gray-100">
      {/* 🔵 Navbar superior */}
      <nav className="bg-[#004153] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src="/logotipo_indra_version_secundaria.jpg"
            alt="Logo Indra"
            className="h-10 object-contain"
          />
          <span className="text-lg font-semibold">Panel del Tutor</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="font-medium">
            {/* Hola, <span className="font-bold">{usuario?.usuario}</span> */}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* 🧩 Contenido principal dividido */}
      <div className="flex gap-6 p-8">
        {/* Panel lateral: información del tutor */}
         <div className="w-1/4 bg-white shadow rounded-lg p-3 flex flex-col items-center text-sm">
          <img
            src= "/logoUsuario.png"
            alt="Foto Tutor"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#004481] mb-4"
          />

          <h2 className="text-xl font-semibold text-[#004153] text-center mb-2">
            {usuario?.usuario || "Tutor"}
          </h2>

          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Código:</strong> {usuario?.codTutor}
          </p>
          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Correo:</strong> {usuario?.correo}
          </p>
        </div>

        {/* 📋 Contenido derecho: gestión */}
        <div className="w-3/4 space-y-10">
          <h2 className="text-2xl font-bold text-[#004153] mb-6">
            Bienvenido al sistema de gestión
          </h2>

          {/* Sección de gestión de aprendices */}
          <section className="bg-white p-3 shadow rounded-lg max-w-[900px] mx-auto">
            <FormAprendiz />
          </section>

          <section className="bg-white p-3 shadow rounded-lg max-w-[900px] mx-auto">
            <ListarAprendices />
          </section>

          {/* Sección de retroalimentaciones */}
          <section className="bg-white p-3 shadow rounded-lg max-w-[900px] mx-auto">
            <RegistrarRetroalimentacion />
          </section>

          <section className="bg-white p-3 shadow rounded-lg max-w-[900px] mx-auto">
            <ListarRetroalimentacion />
          </section>
        </div>
      </div>
    </div>
  );
}

export default PerfilTutor;

