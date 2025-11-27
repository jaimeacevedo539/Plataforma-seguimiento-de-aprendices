import React, { useState, useEffect } from "react";
import FormAprendiz from "../componentes/FormAprendiz";
import ListarAprendices from "../pages/ListarAprendices";
import RegistrarRetroalimentacion from "../pages/Retroalimentacion";
import ListarRetroalimentacion from "../pages/ListarRetroalimentacion";
import RegistrarCompetencia from "./RegistrarCompetencia";
import { obtenerTutorPorCodigo } from "../servicios/tutorService";

function PerfilTutor() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [tutor, setTutor] = useState(null);

  // modales:
  const [showFormAprendiz, setShowFormAprendiz] = useState(false);
  const [showListAprendiz, setShowListAprendiz] = useState(false);
  const [showRetro, setShowRetro] = useState(false);
  const [showCompetencia, setShowCompetencia] = useState(false);
  const [showListRetro, setShowListRetro] = useState(false);

  useEffect(() => {
    const cargarTutor = async () => {
      try {
        if (usuario?.codTutor) {
          const datos = await obtenerTutorPorCodigo(usuario.codTutor);
          setTutor(datos);
        }
      } catch (error) {
        console.error('Error al cargar datos del tutor:', error);
      }
    };
    cargarTutor();
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#004153] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/logotipo_indra_version_secundaria.jpg" alt="Logo Indra" className="h-10 object-contain" />
          <span className="text-lg font-semibold">Panel del Tutor</span>
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold">
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="flex gap-6 p-8">
        <div className="w-1/4 bg-white shadow rounded-lg p-3 flex flex-col items-center text-sm">
          <img src="/logoUsuario.png" alt="Foto Tutor" className="w-32 h-32 rounded-full object-cover border-4 border-[#004481] mb-4" />
          <h2 className="text-xl font-semibold text-[#004153] text-center mb-2">{usuario?.usuario || "Tutor"}</h2>

          {tutor ? (
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1"><strong>Nombre:</strong> {tutor.nombre}</p>
              <p className="text-gray-600 text-sm mb-1"><strong>Código:</strong> {tutor.codTutor}</p>
              <p className="text-gray-600 text-sm mb-1"><strong>Correo:</strong> {tutor.correo}</p>
            </div>
          ) : (
            <p className="text-gray-600 text-sm text-center">Cargando datos del tutor...</p>
          )}
        </div>

        <div className="w-3/4 space-y-12">
          <h2 className="text-2xl font-bold text-[#004153] mb-6">Bienvenido al sistema de gestión</h2>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div onClick={() => setShowFormAprendiz(true)} className="cursor-pointer bg-white border border-gray-200 hover:shadow-xl rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-lg font-bold text-[#004153]">Registrar Aprendiz</h3>
              <p className="text-sm text-gray-500 mt-1">Registra un nuevo aprendiz</p>
            </div>

            <div onClick={() => setShowListAprendiz(true)} className="cursor-pointer bg-white border border-gray-200 hover:shadow-xl rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-lg font-bold text-[#004153]">Listar Aprendices</h3>
              <p className="text-sm text-gray-500 mt-1">Ver todos los aprendices registrados</p>
            </div>

            <div onClick={() => setShowRetro(true)} className="cursor-pointer bg-white border border-gray-200 hover:shadow-xl rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-lg font-bold text-[#004153]">Registrar Retroalimentación</h3>
               <p className="text-sm text-gray-500 mt-1">Asignar observaciones a un aprendiz</p>
            </div>

            <div onClick={() => setShowCompetencia(true)} className="cursor-pointer bg-white border border-gray-200 hover:shadow-xl rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-lg font-bold text-[#004153]">Registrar competencia</h3>
              <p className="text-sm text-gray-500 mt-1">Registra competencias al alumno</p>
            </div>
          

            <div onClick={() => setShowListRetro(true)} className="cursor-pointer bg-white border border-gray-200 hover:shadow-xl rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2"></div>
              <h3 className="text-lg font-bold text-[#004153]">Listar Retroalimentaciones</h3>
              <p className="text-sm text-gray-500 mt-1">Ver todas las retroalimentaciones registradas</p>
            </div>
          </div>

          

          {/* RENDERIZA los componentes / modales controlados */}
          <FormAprendiz show={showFormAprendiz} setShow={setShowFormAprendiz} />
          <ListarAprendices show={showListAprendiz} setShow={setShowListAprendiz} />
          <RegistrarRetroalimentacion show={showRetro} setShow={setShowRetro} />
          <ListarRetroalimentacion show={showListRetro} setShow={setShowListRetro} />
          <RegistrarCompetencia show={showCompetencia} setShow={setShowCompetencia} />
          
        </div>
      </div>
    </div>
  );
}

export default PerfilTutor;

