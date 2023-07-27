import { Link } from "react-router-dom";
import "../css/navBarTeacher.css";
import { Logout } from "../../../ui/components/Logout";
export const NavTeacher = () => {
  return (
    <>
      <div className="navTeacher">
        <div>
          <Link to={"/"}>
            <img src="../../../../teacher.png" alt="" />
          </Link>
        </div>

        <div className="nav-teacher-titles ">
          <div className="nav-teacher-links">
            <Link to={"/teacher-question"}>Crear pregunta</Link>
            <Link to={"/teacher-getquestions"}>Todas las preguntas</Link>
            {/* <Link to={"/create-test"}>Crear un examen</Link> */}
        
          </div>
        </div>
      </div>
    </>
  );
};
