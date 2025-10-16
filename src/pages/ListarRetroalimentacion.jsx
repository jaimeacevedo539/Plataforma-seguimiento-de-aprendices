import { useEffect,useState } from "react";
import axios from "axios";
import ModalPlain from "../componentes/ModalPlain";

const ListarRetroalimentacion = () => {
  const [retroalimentaciones, setRetroalimentaciones] = useState([]);
  const[loading,setLoading]=useState(true);
  const[selectedRetroalimentacion,setSelectedRetroalimentacion]=useState(null);
  const[showListModal,setShowListModal]=useState(false);
  const[showEditModal,setShowEditModal]=useState(false);
    const API_URL = 'http://localhost:8080/api/retroalimentaciones';
    //CARGAR LISTA DE RETROALIMENTACIONES
    const fetchRetroalimentaciones = async () => { 
    try { 
      const response = await axios.get(`${API_URL}/listar`);
      setRetroalimentaciones(response.data);
      setLoading(false);
    } catch (error) {
        console.error('Error al cargar retroalimentaciones:', error);
        setLoading(false);
    }
    };
    useEffect(() => {
        fetchRetroalimentaciones();
    }, []);
    //eliminar retroalimentacion
    const eliminarRetroalimentacion = async (codRetro) => {
      if (!window.confirm("¿Estás seguro de que deseas eliminar esta retroalimentación?")) return;  
        try {
        await axios.delete(`${API_URL}/eliminar/${codRetro}`);
        setRetroalimentaciones(retroalimentaciones.filter(r => r.codRetro !== codRetro));
        alert('Retroalimentación eliminada correctamente');
      } catch (error) {
        console.error('Error al eliminar retroalimentación:', error);
        alert('Error al eliminar retroalimentación');
      } 
    };
    //editar retroalimentacion con modal
    const abrirEditModal = (retroalimentacion) => {
      setSelectedRetroalimentacion(retroalimentacion);
      setShowEditModal(true);
    };
    //guardar cambios de la retroalimentacion editada
    const actualizarRetroalimentacion = async () => {
        try {
         await axios.put(`${API_URL}/actualizar/${selectedRetroalimentacion.codRetro}`, selectedRetroalimentacion);
const nuevasRetroalimentaciones = retroalimentaciones.map(r => 
  r.codRetro === selectedRetroalimentacion.codRetro ? { ...selectedRetroalimentacion } : r
);
setRetroalimentaciones(nuevasRetroalimentaciones);
        setShowEditModal(false);
        alert('Retroalimentación actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar retroalimentación:', error);
        alert('Error al actualizar retroalimentación');
      }     
    };

    

    if (loading) return <p className="text-center mt-10 text-gray-600">Cargando retroalimentaciones...</p>;
    console.log("Retroalimentaciones recibidas:", retroalimentaciones);

    return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 text-center">
      {/* Botón para abrir el modal de lista */}
      <button
        onClick={() => setShowListModal(true)}
        className="bg-[#004153] hover:bg-[#003442] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
      >
       📋 Listar Retroalimentaciones
      </button>

      {/* Modal con la lista */}
      <ModalPlain
        show={showListModal}
        onClose={() => setShowListModal(false)}
        title="Lista de Retroalimentaciones"
        width="1000px"
      >
        {retroalimentaciones.length === 0 ? (
          <p className="text-center text-gray-500">No hay retroalimentaciones registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 border">Código Retroalimentacion</th>
                  <th className="py-2 px-3 border">Aprendiz</th>
                  <th className="py-2 px-3 border">Tutor</th>
                  <th className="py-2 px-3 border">Observación</th>
                  <th className="py-2 px-3 border">Calificación</th>
                  <th className="py-2 px-3 border">Fecha</th>
                  <th className="py-2 px-3 border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {retroalimentaciones.map((r) => (
                  <tr key={r.codRetro} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border">{r.codRetro}</td>
                    <td className="py-2 px-3 border">{r.nombreAprendiz }</td>
                    <td className="py-2 px-3 border">{r.nombreTutor }</td>
                    <td className="py-2 px-3 border">{r.observaciones}</td>
                    <td className="py-2 px-3 border">{r.calificacion}</td>
                    <td className="py-2 px-3 border">
                      {r.fecha ? new Date(r.fecha).toLocaleDateString() : "Sin fecha"}
                    </td>
                    <td className="py-2 px-3 border text-center">
                      <button
                        onClick={() => abrirEditModal(r)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarRetroalimentacion(r.codRetro)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ModalPlain>

      {/* Modal para editar */}
      {showEditModal && selectedRetroalimentacion && (
        <ModalPlain
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Editar Retroalimentación"
          width="400px"
        >
          <div className="space-y-3">
            <input
              type="text"
              name="observacion"
              value={selectedRetroalimentacion.observaciones || ""}
              onChange={(e) =>
                setSelectedRetroalimentacion({
                  ...selectedRetroalimentacion,
                  observaciones: e.target.value,
                })
              }
              placeholder="Observación"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="calificacion"
              value={selectedRetroalimentacion.calificacion || ""}
              onChange={(e) =>
                setSelectedRetroalimentacion({
                  ...selectedRetroalimentacion,
                  calificacion: e.target.value,
                })
              }
              placeholder="Calificación"
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-between mt-3">
              <button
                onClick={actualizarRetroalimentacion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </ModalPlain>
      )}
    </div>
  );
};

export default ListarRetroalimentacion;