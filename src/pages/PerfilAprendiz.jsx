import React, {useState,useEffect} from "react";
import { obtenerRetroalimentacionPorAprendiz } from "../servicios/retroalimentacionService";


function PerfilAprendiz() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [retroalimentaciones, setRetroalimentaciones] = useState([]);

  useEffect(() => {
    const cargarRetroalimentaciones = async () => {  
      try {
        if (usuario?.codAprendiz) {
          const data = await obtenerRetroalimentacionPorAprendiz(usuario.codAprendiz);
          setRetroalimentaciones(data);
          console.log("📦 Retroalimentaciones cargadas:", data);
        }
      } catch (error) {
        console.error('Error al cargar retroalimentaciones:', error);
      }
    };

    cargarRetroalimentaciones();
  }, [usuario]);

  //finalizar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
    };
    
    return (
    <div className="min-h-screen bg-gray-100">
      {/*  Encabezado */}
      <nav className="bg-[#004153] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src="/logotipo_indra_version_secundaria.jpg"
            alt="Logo Indra"
            className="h-10 object-contain"
          />
          <span className="text-lg font-semibold">Panel del Aprendiz</span>
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

      <div className="flex gap-6">
        {/* Panel lateral: Información del aprendiz */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <img
            src="/logoUsuario.png"// Usa una imagen por defecto si no tiene
            alt="Foto del aprendiz"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#004481] mb-4"
          />

          <h2 className="text-xl font-semibold text-[#004153] text-center mb-2">
            {usuario?.usuario || "Aprendiz"}
          </h2>

          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Código:</strong> {usuario?.codAprendiz}
          </p>
          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Correo:</strong> {usuario?.correo}
          </p>
          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Programa:</strong> {usuario?.programa}
          </p>
          <p className="text-gray-600 text-sm text-center mb-1">
            <strong>Etapa:</strong> {usuario?.etapa}
          </p>
        </div>

        {/* Contenido principal: Retroalimentaciones */}
        <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#004153] mb-4">
            Retroalimentaciones recibidas
          </h2>

          {retroalimentaciones.length === 0 ? (
            <p className="text-gray-500">
              Aún no tienes retroalimentaciones registradas.
            </p>
          ) : (
            <ul className="space-y-4">
              {retroalimentaciones.map((retro, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
                >
                  <p><strong>Tutor:</strong> {retro.codTutor}</p>
                  <p><strong>Calificación:</strong> {retro.calificacion}</p>
                  <p><strong>Observaciones:</strong> {retro.observaciones}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilAprendiz;