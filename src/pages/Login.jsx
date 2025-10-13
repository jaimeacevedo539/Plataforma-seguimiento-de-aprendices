import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {
 const [usuario, setUsuario] = React.useState("");
 const [contrasena, setContrasena] = React.useState("");
 const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
 const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login',{
                 usuario, contrasena
                 }); 
            const {rol} = response.data;

            localStorage.setItem('usuario', JSON.stringify(response.data));

            if (rol === 'TUTOR') {
                window.location.href = 'http://localhost:5173/tutor';
                } else if (rol === 'APRENDIZ') {
                window.location.href = 'http://localhost:5173/aprendiz';
                }

             else{
                setError("Rol de usuario no reconocido");
            }
            }  catch (error) {
            setError("Error en el inicio de sesión. Verifica tus credenciales.");
            console.error('Error durante el inicio de sesión:', error);
            }
        };

        return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8]">
      {/* Fondo con difuminado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004481]/80 to-[#009639]/60 blur-sm"></div>

      {/* Ventana modal */}
      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-8 w-[40%] max-w-sm z-10">
        {/* Logo de Indra */}
        <div className="flex justify-center mb-6">
        <img src="/logoIndra.png" alt="Logo Indra" className="h-16 max-w-60 mb-6 object-contain"/>
        

          
        </div>

        <h2 className="text-2xl font-bold text-[#004481] mb-6 text-center">
          Plataforma de Aprendices
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004481] focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004481] focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#004481] hover:bg-[#003463] text-white py-3 rounded-lg font-semibold transition-transform hover:scale-105"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-5 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Indra — Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}

export default Login;