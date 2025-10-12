import React from "react";

function PerfilAprendiz() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  //finalizar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
    };
    return (
        <div className="p-6">
             {/* 🔵 Encabezado y botón de logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#004481]">
          Bienvenido, {usuario?.nombre}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition-all"
        >
          Cerrar sesión
        </button>
      </div>
      <h1 className="text-2xl font-bold text-[#004481] mb-4">
        Bienvenido, {usuario?.nombre}
      </h1>
      <p className="text-gray-700">Estas son tus retroalimentaciones e información.</p>
      {/* Aquí mostraremos las retroalimentaciones del aprendiz */}
    </div>
  );
}

export default PerfilAprendiz;