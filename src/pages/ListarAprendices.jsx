import { useEffect, useState  } from "react";
import axios from "axios";
import ModalPlain from "../componentes/ModalPlain";

const ListarAprendices = () => {
  const [aprendices, setAprendices] = useState([]);
  const[loading,setLoading]=useState(true);
  const[selectedAprendiz,setSelectedAprendiz]=useState(null);
  const[showListModal,setShowListModal]=useState(false);
  const[showEditModal,setShowEditModal]=useState(false);

  const API_URL = 'http://localhost:8080/api/aprendices';

  //CARGAR LISTA DE APRENDICES
  const fetchAprendices = async () => {
    try {
      const response = await axios.get(`${API_URL}/listar`);
      setAprendices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar aprendices:', error);
      setLoading(false);
    }
};


    useEffect(() => {
        fetchAprendices();
    }, []);

    //eliminar aprendiz
    const eliminarAprendiz = async (codAprendiz) => {
      if (!window.confirm("¿Estás seguro de que deseas eliminar este aprendiz?")) return;
      try {
        await axios.delete(`${API_URL}/eliminar/${codAprendiz}`);
        setAprendices(aprendices.filter(a => a.codAprendiz !== codAprendiz));
        alert('Aprendiz eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar aprendiz:', error);
        alert('Error al eliminar aprendiz');
      }
    };

    //editar aprendiz con modal
    const abrirModalEdicion = (aprendiz) => {
      setSelectedAprendiz(aprendiz);
      setShowEditModal(true);
    };

    //guardar cambios del aprendiz editado
    const actualizarAprendiz = async () => {
      try {
       await axios.put(`${API_URL}/actualizar/${selectedAprendiz.codAprendiz}`, selectedAprendiz);
const nuevosAprendices = aprendices.map(a => 
  a.codAprendiz === selectedAprendiz.codAprendiz ? { ...selectedAprendiz } : a
);
setAprendices(nuevosAprendices);

        setShowListModal(false);
        alert('Aprendiz actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar aprendiz:', error);
        alert('Error al actualizar aprendiz');
      }
    };

    //manejar cambios en el formulario del modal
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedAprendiz({ ...selectedAprendiz, [name]: value });
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Cargando aprendices...</p>;


       return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 text-center">
      {/* Botón principal */}
      <button
        onClick={() => setShowListModal(true)}
        className="bg-[#004153] hover:bg-[#003442] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
      >
        📋 Listar Aprendices
      </button>

      {/* Modal LISTA de aprendices */}
      {showListModal && (
        <ModalPlain
          show={showListModal}
          onClose={() => setShowListModal(false)}
          title="Lista de Aprendices"
          className="max-w-6xl w-[100vw]" 
        >
          {aprendices.length === 0 ? (
            <p className="text-center text-gray-500">No hay aprendices registrados.</p>
          ) : (
            <div className="overflow-x-auto max-h-[70vh]">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-100 sticky top-0">
                  <tr>
                    <th className="py-2 px-3 border">Código</th>
                    <th className="py-2 px-3 border">Nombre</th>
                    <th className="py-2 px-3 border">Correo</th>
                    <th className="py-2 px-3 border">Programa</th>
                    <th className="py-2 px-3 border">Etapa</th>
                    <th className="py-2 px-3 border">Tutor</th>
                    <th className="py-2 px-3 border text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {aprendices.map((a) => (
                    <tr key={a.codAprendiz} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border">{a.codAprendiz}</td>
                      <td className="py-2 px-3 border">{a.nombre}</td>
                      <td className="py-2 px-3 border">{a.correo}</td>
                      <td className="py-2 px-3 border">{a.programa}</td>
                      <td className="py-2 px-3 border">{a.etapa}</td>
                      <td className="py-2 px-3 border">{a.codTutor}</td>
                      <td className="py-2 px-3 border text-center">
                        <button
                          onClick={() => abrirModalEdicion(a)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarAprendiz(a.codAprendiz)}
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
      )}

      {/* Modal EDITAR aprendiz */}
      {showEditModal && selectedAprendiz && (
        <ModalPlain
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={`Editar Aprendiz - ${selectedAprendiz.nombre}`}
          width="500px"
        >
          <div className="space-y-3">
            <input
              type="text"
              name="nombre"
              value={selectedAprendiz.nombre || ""}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="correo"
              value={selectedAprendiz.correo || ""}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="programa"
              value={selectedAprendiz.programa || ""}
              onChange={handleChange}
              placeholder="Programa"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="etapa"
              value={selectedAprendiz.etapa || ""}
              onChange={handleChange}
              placeholder="Etapa"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="codTutor"
              value={selectedAprendiz.codTutor || ""}
              onChange={handleChange}
              placeholder="Código Tutor"
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-between mt-3">
              <button
                onClick={actualizarAprendiz}
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

export default ListarAprendices;