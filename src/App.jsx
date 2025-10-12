
import Login from './pages/Login';
import PerfilTutor from './pages/PerfilTutor';
import PerfilAprendiz from './pages/PerfilAprendiz';
import RutaProtegida from './componentes/RutaProtegida';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tutor" element={<PerfilTutor />} />
        <Route path="/aprendiz" element={<PerfilAprendiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
