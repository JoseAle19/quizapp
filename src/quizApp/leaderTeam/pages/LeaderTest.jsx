import { NavBarLeader } from "../ui/NavBarLeader";
import "../css/NavBarLeader.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTest } from "../../../store/slices/testSlice/thunks";
import { Loading } from "../../../ui/components/Loading";
import { useNavigate } from "react-router-dom";
import { custom_hook_jsons } from "../../global_hooks/custom_hook_jsons";
export const LeaderTest = () => {
  const { user } = useSelector((state) => state.auth);
  const { tests, isLoading } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTest(user.year));
  }, []);
  const {getStorage,parseJson} = custom_hook_jsons();
  return (
    <div className="Leadertest-container">
      <NavBarLeader />
      <h1 className="Leadertest-title">Ver todos</h1>
      <div className="Leadertest-test">
        {isLoading ? (
          <Loading />
        ) : tests.test?.length < 1 ? (
          <h1>No hay examenes previos</h1>
        ) : (
          tests.test?.map((test, index) => {
            return (
              <div key={index} className="Leadertest-test-container">
                <p className="Leadertest-test-name">
                  Nombre del examen {test.name}
                </p>
                <p className="Leadertest-test-duration">
                  Duracion {test.duration}s
                </p>

                <p className="Leadertest-test-year">
                  Año del examen {test.year}
                </p>
                <button
                  onClick={() => {
                    if (test.duration === 0) {
                      alert("El examen no tiene duracion");
                      return;
                    }
                    if (
                      getStorage("Idtest") &&
                      parseJson(getStorage("Idtest")).status === "pending" &&
                      parseJson(getStorage("Idtest")).id != test.id
                    ) {
                      alert("Tienes un examen pendiente");
                      return;
                    } else {
                      navigate(`/doing-test/${test.id}/${test.duration}`);
                    }
                  }}
                  className={
                    parseJson(getStorage("Idtest"))?.id == test.id
                      ? "Leadertest-btn-doing"
                      : "Leadertest-btn"
                  }
                >
                  {parseJson(localStorage.getItem("Idtest"))?.id == test.id
                    ? "Continuar examen"
                    : "Participar o ver examen"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
