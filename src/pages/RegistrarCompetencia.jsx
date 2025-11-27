import React, { useState } from "react";
import { registrarCompetencia } from "../servicios/competenciasService";
import ModalPlain from "../componentes/ModalPlain";

function RegistrarCompetencia({ show, setShow }) {
  const [formData, setFormData] = useState({
    codAprendiz: "",
    nota_uno: "",
    nota_dos: "",
    nota_tres: "",
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
      await registrarCompetencia({
        ...formData,
        cod_aprendiz: parseInt(formData.codAprendiz),
        
      });

      setMensaje(" Competencia registrada correctamente");
      setFormData({
        codAprendiz: "",
        competencia: "",
        nota_uno: "",
        nota_dos: "",
        nota_tres: "",
      });
    } catch (error) {
      console.error("Error al registrar competencia:", error);
      setMensaje(" Error al registrar competencia");
    }
  };

  return (
    <div >
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
      </h2>
      <ModalPlain 
      show={!!show} 
      onClose={() => setShow(false)} 
      title="Formulario de Competencia"
      width="600px">

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Código del Aprendiz</label>
          <input
            type="number"
            name="codAprendiz"
            value={formData.codAprendiz}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Competencia</label>
          <textarea
            name="competencia"
            value={formData.competencia}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Nota 1</label>
          <input
            type="number"
            name="nota_uno"
            value={formData.nota_uno}
            onChange={handleChange}
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            
          />
        </div>
        <div>
          <label className="block font-semibold">Nota 2</label>
          <input
            type="number"
            name="nota_dos"
            value={formData.nota_dos}
            onChange={handleChange}
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            
          />
        </div>
        <div>
          <label className="block font-semibold">Nota 3</label>
          <input
            type="number"
            name="nota_tres"
            value={formData.nota_tres}
            onChange={handleChange}
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#004153] text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Enviar
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

export default RegistrarCompetencia;
