import axios from "axios";

const API_URL = 'http://localhost:8080/api/retroalimentaciones'; // backend

export const registrarRetroalimentacion = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, data);        
    return response.data;
    } catch (error) {
        console.error('Error al enviar retroalimentación:', error);
        throw error;
    }
};

export const listarRetroalimentaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/listar`);
        return response.data;
    } catch (error) {
        console.error('Error al listar retroalimentaciones:', error);
        throw error;
    }
};

export const actualizarRetroalimentacion = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/actualizar/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar retroalimentación:', error);
        throw error;
    }       
};  

export const eliminarRetroalimentacion = async (codRetro) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar/${codRetro}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar retroalimentación:', error);
        throw error;
    }
}; 
