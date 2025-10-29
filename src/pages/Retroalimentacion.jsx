import React, { useState } from "react";
import { registrarRetroalimentacion } from "../servicios/retroalimentacionService";
import ModalPlain from "../componentes/ModalPlain";

function RegistrarRetroalimentacion() {
  const [formData, setFormData] = useState({
    codAprendiz: "",
    codTutor: "",
    observaciones: "",
    calificacion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await registrarRetroalimentacion({
        ...formData,
        cod_aprendiz: parseInt(formData.codAprendiz),
        cod_tutor: parseInt(formData.codTutor),
      });

      setMensaje(" Retroalimentación registrada correctamente");
      setFormData({
        codAprendiz: "",
        codTutor: "",
        observaciones: "",
        calificacion: "",
      });
    } catch (error) {
      console.error("Error al registrar retroalimentación:", error);
      setMensaje(" Error al registrar retroalimentación");
    }
  };

  return (
    <div >
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
      </h2>
     <button
    onClick={() => setShowModal(true)}
    className="bg-[#004153] hover:bg-[#003442] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 min-w-[230px] text-center"
  >
     Registrar Retroalimentación
  </button>
      <ModalPlain 
      show={showModal} 
      onClose={() => setShowModal(false)} 
      title="Formulario de Retroalimentación"
      width="600px">

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Código del Aprendiz</label>
          <input
            type="number"
            name="codAprendiz"
            value={formData.codAprendiz}
            onChange={handleChange}
            placeholder="Ej: 1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Código del Tutor</label>
          <input
            type="number"
            name="codTutor"
            value={formData.codTutor}
            onChange={handleChange}
            placeholder="Ej: 1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Escribe tus observaciones aquí..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Calificación</label>
          <input
            type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
            placeholder="Ej: 100"
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#004153] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>

      {mensaje && (
        <p
          className={`mt-4 text-center font-semibold ${
            mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}
      </ModalPlain>
    </div>
  );
}

export default RegistrarRetroalimentacion;
