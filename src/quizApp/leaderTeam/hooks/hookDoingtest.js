import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hookCreateTest } from "../../teacher/hooks/hookCreateTest";
import Swal from "sweetalert2";
import { socket } from "../../../socket";
export const hookDoingtest = () => {
  // Estado del examen en curso
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionsAnswered, setQuestionsAnswered] = useState({});
  // Hook para obtener el id y la duracion del examen, que viene de la anterio navegacion de la pagina LeaderPage
  const { id, duration } = useParams();
  //Estados globales de redux
  const user = useSelector((state) => state.auth.user);
  const tests = useSelector((state) => state.test.questionsByTest);
  // Custom hook para ver si es  en segundos o en minutos la duracion del examen
  const { seconstOrMinutes, seconstOrMinutesByTest } = hookCreateTest();
  // Hook para navegacion
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
   // Enviar datos al socket, como el usuario y la respuesta seleccionada
  const responsesPerUsers = (questionIndex, answer) => {
    // enviar datos al socket
    socket.emit("client-user-questionsAnswered", {
      user,
      questionIndex,
    });
    setQuestionsAnswered({
      ...questionsAnswered,
      [questionIndex]: questionIndex,
    });
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  // Los mismpo pero este lo hace hacia las interfaces de las tablas
  const addQuestionAnswered = () => {
    socket.emit("client-user-DoneTest", {
      user,
      questionsAnswered: selectedAnswers,
      timeDone: localStorage.getItem("timeLeft"),
    });
  };

  // Eliminar todo del localstorage
  const handleFinishTest = () => {
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("Idtest");
    localStorage.removeItem("selectedAnswers");
    setSelectedAnswers({});
    socket.emit(
      "client-user-disconnected",
      JSON.parse(localStorage.getItem("user"))
    );
    socket.disconnect();
    navigate("/test-leader");
  };

  const handleTimerEnd = () => {
    handleFinishTest();
    return;
  };

  const confirmFinishTest = () => {
    Swal.fire({
      title: "¿Estas seguro de terminar el examen?",
      text: "No podras revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, terminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
      addQuestionAnswered();
        handleFinishTest();
      } else {
        return;
      }
    });
  };
  return {
    selectedAnswers,
    setSelectedAnswers,
    id,
    duration,
    user,
    tests,
    seconstOrMinutes,
    seconstOrMinutesByTest,
    navigate,
    dispatch,
    // Funciones

    handleFinishTest,
    handleTimerEnd,
    confirmFinishTest,
    addQuestionAnswered,
    responsesPerUsers,
  };
};
