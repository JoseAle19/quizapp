import { Link } from "react-router-dom";
import "../css/NavBarLeader.css";
export const NavBarLeader = () => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
      <div className={"sidebar open"}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="sr-only">Lider del equipo</span>
          <span className="icon"></span>
        </button>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/home-leader" className="nav-link">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/test-leader" className="nav-link">
                Ver examenes
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="nav-link">
                Mi perfil
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="nav-link">
                Ver equipo
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};
