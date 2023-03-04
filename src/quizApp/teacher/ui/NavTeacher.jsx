import { Link } from "react-router-dom";
import "../css/navBarTeacher.css";
import { useSelector } from "react-redux";
export const NavTeacher = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="navTeacher">
        <div>
          <Link to={"/"}>
            <img src="../../../../public/teacher.png" alt="" />
          </Link>
        </div>

        <div className="nav-teacher-titles ">
          <div className="nav-teacher-links">
            <Link to={"/teacher-question"}>Crear pregunta</Link>
            <Link to={"/teacher-getquestions"}>Todas las preguntas</Link>
            {/* <Link to={"/teacher-addStudents"}>Administrar alumnos</Link>/ */}
          
          </div>
        </div>
      </div>
    </>
  );
};
