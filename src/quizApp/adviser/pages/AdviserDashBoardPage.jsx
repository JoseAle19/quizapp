import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamForAdviserById } from "../../../store/slices/teamSlice/thunks";
import '../css/dashBoard.css'
export const AdviserDashBoardPage = () => {
  const dispatch = useDispatch();
  const { team, isLoading } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTeamForAdviserById(user.id));
  }, []);

  return (
    <div>
      <h1>Pantalla del asesor</h1>
      {isLoading ? (
        <h1>Cargando</h1>
      ) : (
        <div>
          <h2>Nombre del equipo: {team.nameTeam}</h2>
          <ul className="dahsUl">
            {team.students?.map((student, index) => (
                <div className={ student.idrol === 1 ?"isLeader": 'noIsLeader' } key={student.email}>
                  <span>Nombre del estudiante: {student.name}</span>
                  <p>Correo: {student.email}</p>
                  <button className="buttons">
                    Eliminar
                  </button>
                  <button className="buttons">
                    Editar
                  </button>
                </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
