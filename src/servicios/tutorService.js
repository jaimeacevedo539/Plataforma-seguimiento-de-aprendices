import axios from 'axios';
const API_URL = 'http://localhost:8080/api/tutores'; // backend
export const obtenerTutorPorCodigo = async (codTutor) => {
    try {
        const response = await axios.get(`${API_URL}/${codTutor}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener tutor por código:', error);
        throw error;
    }
};
