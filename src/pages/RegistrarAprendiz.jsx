import React, { useState } from 'react';
import { registrarAprendiz } from '../servicios/aprendizService';

function RegistrarAprendiz() {
  const [formData, setFormData] = useState({
    codAprendiz: '',
    nombre: '',
    correo: '',
    programa: '',
    etapa:'',
    codTutor: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📦 Datos enviados al backend:", formData); 
    try {
      const response = await registrarAprendiz({...formData,
        cod_tutor: parseInt(formData.codTutor)
      });
      alert('Aprendiz registrado correctamente');
         setFormData({
        nombre: "",
        correo: "",
        programa: "",
        etapa: "",
        codTutor: ""
      });
    } catch {
      alert('Error al registrar aprendiz');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registrar Aprendiz</h2>
      <form onSubmit={handleSubmit}>
        <input name="codAprendiz" placeholder="Código" value={formData.codAprendiz} onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
        <input name="programa" placeholder="Programa" value={formData.programa} onChange={handleChange} />
        <input name="etapa" placeholder="Etapa" value={formData.etapa} onChange={handleChange} />
        <input name="codTutor" placeholder="Código del tutor" value={formData.codTutor} onChange={handleChange} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarAprendiz;