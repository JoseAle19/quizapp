import { useEffect, useState } from "react";
import "../css/CounterTime.css";
export const CountdownTimer = ({ minutes, seconds, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(seconds * 60);
  useEffect(() => {
    const timeLeftStorage = JSON.parse(localStorage.getItem("timeLeft"));
    if (timeLeftStorage) {
      setTimeLeft(timeLeftStorage);
    }
  }, []);
  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
        // Guardar en el localstorage el tiempo restante
        // para que cuando se recargue la pagina no se pierda el tiempo
        localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
      }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Cuando se acabe el tiempo
      // hacer un dispatch ala api y donde se guarde el id del examen y del usuario
      onTimerEnd();
    }
  }, [timeLeft, onTimerEnd]);

  const formattedMinutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const formattedSeconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="CounterTime-container">
      <h1 className="CounterTime-titleTime">
        {formattedMinutes}:{formattedSeconds}
      </h1>
    </div>
  );
};
