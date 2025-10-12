import { useState } from "react";
import axios from "axios";
import { comma } from "postcss/lib/list";

export default function FormAprendiz() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    programa: '',
    etapa: '',
    codTutor: ''
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");

   const validar=()=>{
  const nuevosErrores = {};
  if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
  if (!formData.correo.trim()) nuevosErrores.correo = "El correo es obligatorio";
  if (!/\S+@\S+\.\S+/.test(formData.correo)) nuevosErrores.correo = "Correo no válido";
  if (!formData.programa.trim()) nuevosErrores.programa = "El programa es obligatorio";
  if (!formData.etapa.trim()) nuevosErrores.etapa = "La etapa es obligatoria";
  if (!formData.codTutor.trim()) nuevosErrores.codTutor = "El código del tutor es obligatorio";
  setErrors(nuevosErrores);
  return Object.keys(nuevosErrores).length === 0;
   }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validar()) return;
        try {
          await axios.post('http://localhost:8080/api/aprendices/registrar', formData);
          setMensaje("Aprendiz registrado correctamente");
          setFormData({ nombre: '', correo: '', programa: '', etapa: '', codTutor: '' });   
          setErrors({});
        } catch (error) {
          setMensaje("Error al registrar aprendiz");
          console.error('Error al registrar aprendiz:', error);
        }
      };    
    return (    
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Registro de Aprendices
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block font-semibold">Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.correo ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </div>
        <div>
          <label className="block font-semibold">Programa</label>
          <input
            type="text"
            name="programa"
            value={formData.programa}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.programa ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.programa && <p className="text-red-500 text-sm">{errors.programa}</p>}
        </div>
        <div>
          <label className="block font-semibold">Etapa</label>
          <input
            type="text"
            name="etapa"
            value={formData.etapa}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.etapa ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.etapa && <p className="text-red-500 text-sm">{errors.etapa}</p>}
        </div>
        <div>
          <label className="block font-semibold">Código del Tutor</label>
          <input
            type="text"
            name="codTutor"
            value={formData.codTutor}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.codTutor ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.codTutor && <p className="text-red-500 text-sm">{errors.codTutor}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
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
    </div>
  );
}

