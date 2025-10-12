import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aprendices'; // backend

export const registrarAprendiz = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, data);
    return response.data;
  } catch (error) {
    console.error('Error al registrar aprendiz:', error);
    throw error;
  }
};
