import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTest } from "../../../store/slices/testSlice/thunks";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { custom_hook_jsons } from "../../global_hooks/custom_hook_jsons";
import { socket } from "../../../socket";

export const hookCreateTest = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const [questionsAle, setQuestionsAle] = useState([]);
  const [numberQ, setNumberQ] = useState(0);
  const [isAleatorio, setIsAleatorio] = useState(false);
  const [isManual, setIsManual] = useState(false);

  // hook para parsear y obtener el getStorage
  const { getStorage, parseJson } = custom_hook_jsons();


  // Cunado el suario se conecta
  const handleUser = () => {
    socket.connect();
    socket.emit("user", parseJson(localStorage.getItem("user")));
  };

  // La fucion existQuestion verifica si la pregunta ya esta agregada al arreglo questionsAle
  const existQuestion = (id) => {
    return questionsAle.filter((question) => question.id_Q === id).length > 0;
  };

  //  Agregar preguntas manuales
  const addManueal = (questionParam) => {
    const { id_Q, timeQ, question } = questionParam;
    questionsAle.filter((question) => question.id_Q === questionParam.id_Q)
      .length > 0
      ? alert("La pregunta ya esta agregada")
      : setQuestionsAle([...questionsAle, { id_Q, timeQ, question }]);
  };

  const handleChangeManual = (e) => {
    setNumberQ(0);
    setIsManual(e.target.checked);
    if (!e.target.checked) {
      setQuestionsAle([]);
    }
  };

  const clearAllDAta = () => {
    setIsAleatorio(false);
    setNumberQ(0);
    setQuestionsAle([]);
    setIsManual(false);
  };

  const clearDAta = () => {
    setIsAleatorio(false);
    setNumberQ(0);
    setQuestionsAle([]);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay suficientes preguntas para crear el examen",
    });
  };

  const addQuestionAleatorio = () => {
    // obtener la longitud del arreglo
    let len = questions.length;

    // generar n índices aleatorios únicos dentro del rango de índices del arreglo
    let indices = [];
    while (indices.length < numberQ) {
      let randomIndex = Math.floor(Math.random() * len);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    // usar esos índices para obtener los elementos correspondientes del arreglo
    let aleatorios = indices.map((index) => {
      const { id_Q, timeQ, question } = questions[index];
      return { id_Q, timeQ, question };
    });

    setQuestionsAle(aleatorios);
  };

  const handleChangeAleatorio = (e) => {
    setIsAleatorio(e.target.checked);
    e.target.checked
      ? questions.length < numberQ
        ? clearDAta()
        : addQuestionAleatorio()
      : setQuestionsAle([]);
  };

  const handleCahngeNumberQ = (e) => {
    setNumberQ(e.target.value);
  };

  // Funciones del componente de crear examen manual
  const deleteQuestion = (id) => {
    setQuestionsAle(questionsAle.filter((question) => question.id_Q !== id));
  };

  //Verificar si son segundoso minutos o horas
  const seconstOrMinutes = (time) => {
    const minutes = Math.floor(time);

    return `${minutes} minutos`;
  };
  const seconstOrMinutesByTest = (time) => {

  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (minutes === 0) {
      return { minutes, seconds };
    }
    return { minutes, seconds };
  };

  const postTest = async (data) => {
    const res = await dispatch(addTest(data));
    console.log(res.status);
    if (res.status === true) {
      Swal.fire({
        icon: "success",
        title: "Examen creado",
        showConfirmButton: false,
        timer: 1500,
      });
      clearAllDAta();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!",
      });
    }
  };
  //  Verificar si el examen esta activo
  const verifyTestActive = ({ status, msg }, { id, duration }) => {
    if (status) {
      if (!getStorage('Idtest')) {
        handleUser()
      }
       navigate(`/doing-test/${id}/${duration}`);
    } else {
      return Swal.fire({
        title: "Examen no esta activo",
        text: "Porfavor contacta al administrador",
        icon: "warning",
        timer: 3000,
      });
    }
  };

  return {
    questionsAle,
    numberQ,
    isAleatorio,
    isManual,
    existQuestion,
    addManueal,
    handleChangeManual,
    questions,
    handleChangeAleatorio,
    handleCahngeNumberQ,
    deleteQuestion,
    seconstOrMinutes,
    postTest,
    seconstOrMinutesByTest,
    seconstOrMinutes,
    verifyTestActive,
  };
};
