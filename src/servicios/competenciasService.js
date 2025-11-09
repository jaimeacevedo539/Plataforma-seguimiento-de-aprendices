import axios from "axios";

const API_URL = 'http://localhost:8080/api/competencias'; // backend

export const registrarCompetencia = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/insertar`, data);
    return response.data;
    } catch (error) {
        console.error('Error al registrar competencia:', error);
        throw error;
    }
};

export const listarCompetencias = async (codAprendiz) => {
    try {
        const response = await axios.get(`${API_URL}/lista/${codAprendiz}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar competencias:', error);
        throw error;
    }
};