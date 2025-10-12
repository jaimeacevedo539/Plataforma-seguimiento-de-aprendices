import React from "react";
import { registrarRetroalimentacion } from "../servicios/retroalimentacionService";
import { useState } from "react";

function RegistrarRetroalimentacion() {
  const [formData, setFormData] = useState({
    codAprendiz: '',
    codTutor: '',
    observaciones: '',
    calificacion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registrarRetroalimentacion({
        ...formData,
        cod_aprendiz: parseInt(formData.codAprendiz),
        cod_tutor: parseInt(formData.codTutor)
      });
      alert('Retroalimentación registrada correctamente');
      setFormData({
        codAprendiz: '',
        codTutor: '',
        observaciones: '',
        calificacion: ''
      });
    } catch {
      alert('Error al registrar retroalimentación');
    }
  };

  return (
        <div style={{ padding: '2rem' }}>
          <h2>Registrar Retroalimentación</h2>
          <form onSubmit={handleSubmit}>
            <input name="codAprendiz" placeholder="Código aprendiz" value={formData.codAprendiz} onChange={handleChange} />
            <input name="codTutor" placeholder="Codigo tutor" value={formData.codTutor} onChange={handleChange} />
            <input name="observaciones" placeholder="Observacion" value={formData.observaciones} onChange={handleChange} />
            <input name="calificacion" placeholder="calificacion" value={formData.calificacion} onChange={handleChange} />
            <button type="submit">Registrar</button>
          </form>
        </div>
  );
}


export default RegistrarRetroalimentacion;