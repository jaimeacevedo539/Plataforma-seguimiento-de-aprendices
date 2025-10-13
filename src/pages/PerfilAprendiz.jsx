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
    <div className="p-6">
      {/* 🔵 Encabezado */}
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

      <p className="text-gray-700 mb-4">
        Estas son tus retroalimentaciones e información.
      </p>

      {/* 🟢 Sección de retroalimentaciones */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-[#004481] mb-4">
          Retroalimentaciones recibidas
        </h2>

        {retroalimentaciones.length === 0 ? (
          <p className="text-gray-500">Aún no tienes retroalimentaciones registradas.</p>
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
  );
}

export default PerfilAprendiz;