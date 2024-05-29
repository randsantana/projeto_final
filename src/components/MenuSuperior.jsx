import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">Controle de Produto</Link>
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link to="/barber" className="nav-link">Incluir Barbeiro</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Incluir Corte</Link>
          </li>
          <li className="nav-item">
            <Link to="/manutencao" className="nav-link">Manutenção de Produto</Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">Cadastrar Usuário</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-sm btn-outline-secondary">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;