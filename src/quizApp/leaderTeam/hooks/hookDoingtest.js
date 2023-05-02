import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hookCreateTest } from "../../teacher/hooks/hookCreateTest";
import Swal from "sweetalert2";
import { socket } from "../../../socket";
export const hookDoingtest = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { id, duration } = useParams();
  const user = useSelector((state) => state.auth.user);
  const tests = useSelector((state) => state.test.questionsByTest);
  const { seconstOrMinutes, seconstOrMinutesByTest } = hookCreateTest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectAnswer = (questionIndex, answerIndex) => {
    // enviar datos al socket
    socket.emit("client-user-answer", {
      user,
      questionIndex,
      answerIndex,
    });
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  // remover el localstorage
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
    handleSelectAnswer,
    handleFinishTest,
    handleTimerEnd,
    confirmFinishTest,
  };
};
