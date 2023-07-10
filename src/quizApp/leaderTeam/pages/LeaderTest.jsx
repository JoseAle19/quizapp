import { NavBarLeader } from "../ui/NavBarLeader";
// import "../css/NavBarLeader.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTest, getTestActive } from "../../../store/slices/testSlice/thunks";
import { Loading } from "../../../ui/components/Loading";
import { custom_hook_jsons } from "../../global_hooks/custom_hook_jsons";
import { hookCreateTest } from "../../teacher/hooks/hookCreateTest";
import { CountdownTimer } from "../components/CounterTime";
import { socket } from "../../../socket";
import Swal from "sweetalert2";
// socket
export const LeaderTest = () => {
  const { user } = useSelector((state) => state.auth);
  const { tests, isLoading } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTest(user.year));
  }, []);
  // Funcion para mandar el usuario al socket

  const handleTimerEnd = () => {
    alert("¡Se acabó el tiempo!");
  };
  // CustomHook
  const { seconstOrMinutesByTest, seconstOrMinutes, verifyTestActive } =
    hookCreateTest();
  const { getStorage, parseJson } = custom_hook_jsons();
  return (
    <div className="Leadertest-container">
      <NavBarLeader />
      <h1 className="Leadertest-title">Examenes disponibles</h1>
      <div className="Leadertest-test">
        {isLoading ? (
          <Loading />
        ) : tests.test?.length == 0 ? (
          <h1>No hay examenes previos</h1>
        ) : (
          tests.test?.map((test, index) => {
            return (
              <div key={index} className="Leadertest-test-container">
                <p className="Leadertest-test-name">
                  Nombre del examen {test.name}
                </p>

                {test.id == parseJson(getStorage("Idtest"))?.id ? (
                  <CountdownTimer
                    minutes={seconstOrMinutesByTest(test.duration).minutes}
                    onTimerEnd={handleTimerEnd}
                  />
                ) : (
                  <p className="Leadertest-test-duration">
                    Duracion {seconstOrMinutes(test.duration)}
                  </p>
                )}

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
                      // Alerta de que estoy haciendo otro examen
                      Swal.fire({
                        title: "Tienes un examen en curso",
                        text: "Tienes un examen en curso, no puedes hacer otro examen hasta que termines el que estas haciendo",
                        icon: "warning",
                      });
                      return;
                    } else {
                      const data = dispatch(getTestActive(test.id));
                      return data.then((data) => verifyTestActive(data, test));
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
