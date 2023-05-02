import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "../../../store/slices/testSlice/thunks";
import { custom_hook_jsons } from "../../global_hooks/custom_hook_jsons";
import { Loading } from "../../../ui/components/Loading";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

export const AdminDashBoardPage = () => {
  const { tests, isLoading } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  // Navigate
  const  navigate  = useNavigate();
  useEffect(() => {
    dispatch(getTest(2023));
   
  }, []);
  // CustomHook para parsear jsons
  const { getStorage, parseJson } = custom_hook_jsons();
  return (
    <>
      <div className="Leadertest-test">
        <h1>Estado de examen</h1>
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

                {test.id == parseJson(getStorage("Idtest"))?.id ? (
                  <CountdownTimer
                    minutes={seconstOrMinutesByTest(test.duration).minutes}
                    seconds={seconstOrMinutesByTest(test.duration).seconds}
                    onTimerEnd={handleTimerEnd}
                  />
                ) : (
                  <p className="Leadertest-test-duration">
                    Duracion {test.duration}s
                  </p>
                )}

                <p className="Leadertest-test-year">
                  Año del examen {test.year}
                </p>

                <button 
                onClick={() => {
                  navigate(`/questions-test/${test.id}`)
                }}
                className="Leadertest-btn">Ver examen</button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
