import { useEffect} from "react";
// importaciones de redux
import { useDispatch, useSelector } from "react-redux";
// Slice de test para obtener los examenes
import { getTest } from "../../../store/slices/testSlice/thunks";
// custom hooks convertir json
import { custom_hook_jsons } from "../../global_hooks/custom_hook_jsons";
import Swal from "sweetalert2";

// Componentes es el de cargando
import { Loading } from "../../../ui/components/Loading";
import { useNavigate } from "react-router-dom";

export const ViewTests = () => {
    const { tests, isLoading } = useSelector((state) => state.test);
    const dispatch = useDispatch();
    // Navigate
    const  navigate  = useNavigate();
    useEffect(() => {
      dispatch(getTest(2023));
     
    }, []);
    // CustomHook para parsear jsons
    const { getStorage, parseJson } = custom_hook_jsons();
  
  //? Alerta para que aun no muestre el examen
    const alertForTest = () => {
      Swal.fire({
        title: "El examen aun no esta disponible",
        text: "El examen aun no esta disponible",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
      return (
    <>
      <div className="">
        <h1>Mostrar el examen</h1>
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
                    Duracion {test.duration} minutos
                  </p>
                )}

                <p className="Leadertest-test-year">
                  Año del examen {test.year}
                </p>

                <button 
                onClick={() => {
                     // alertForTest()
                  // navigate(`/questions-test/${test.id}`)
                    navigate(`/grafics/${test.id}/${test.duration}`)
                }}
                className="Leadertest-btn">Ver examen</button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
