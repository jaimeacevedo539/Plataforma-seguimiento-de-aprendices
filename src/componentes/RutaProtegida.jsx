import React from "react";
import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolPermitido }) {
    const usuario = JSON.parse(localStorage.getItem('usuario')|| 'null');

    if (!usuario) {
        return <Navigate to="/" replace />;
    }
    if (usuario.rol !== rolPermitido) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default RutaProtegida;