import Cadastrar_Product from './components/Cadastrar_Product'
import Menu_Superior from './components/MenuSuperior';
import Manutencao_Product from './components/ManutencaoProduct';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import Cadastrar_Barbeiro from './components/Cadastrar_Barbeiro';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  if (!autenticado) {
    navigate('/login'); // Redirect to login on unauthorized access
    return null;
  }

  return children;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <Menu_Superior />}
      <Routes>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/" element={autenticado ? (<Cadastrar_Product /> // Use replace to prevent history stack issues
            ) : <FormularioLogin />}
        />
        <Route path="/Product" element={<ProtectedRoute><Cadastrar_Product /></ProtectedRoute>} />
        <Route path="/Manutencao" element={<ProtectedRoute><Manutencao_Product /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><Cadastrar_Usuarios /></ProtectedRoute>} />
        <Route path="/Barber" element={<ProtectedRoute><Cadastrar_Barbeiro /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;
