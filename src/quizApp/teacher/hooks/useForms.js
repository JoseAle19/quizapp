import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addQuestion,
  deleteQuestionThunk,
  updateQuestionThunk,
} from "../../../store/slices/questions/thunks";
import { deleteQuestionSlice, questionUpdateSlice } from "../../../store/slices/questions/questionsSlice";

export const useForms = (initialForm = {}) => {
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialForm);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const changeInputs = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const saveQuestion = (e) => {
    e.preventDefault();
    if (formState.idCategory < 1) {
      Swal.fire("Error", "Debe seleccionar una categoria", "error");
      return;
    }
    if (formState.timeQ < 1) {
      Swal.fire("Error", "Debe seleccionar un tiempo", "error");
      return;
    }

    if (formState.question.trim().length < 5) {
      Swal.fire("Error", "Pregunta muy corta", "error");
      return;
    }
    if (
      !validateOneAnswer(formState.s1, formState.s2, formState.s3, formState.s4)
    ) {
      return;
    }

    if (
      formState.r1.length < 1 ||
      formState.r2.length < 1 ||
      formState.r3.length < 1 ||
      formState.r4.length < 1
    ) {
      Swal.fire("Error", "Coloca todas las respuestas", "error");
      return;
    }
    dispatch(addQuestion(formState));

    setFormState(initialForm);
    Swal.fire("Correcto", "Pregunta guardada", "success");
    return setFormState(initialForm);
  };

  // funciones para actualizar preguntas
  const clearALlState = () => {
    setFormState(initialForm);
  };

  const validateOneAnswer = (s1, s2, s3, s4) => {
    const answers = [s1, s2, s3, s4];
    const data = answers.filter((answer) => answer === true);
    if (data.length < 1) {
      Swal.fire(
        "Error",
        "Debe seleccionar al menos una respuesta correcta",
        "error"
      );
      return false;
    }
    if (data.length > 1) {
      Swal.fire(
        "Error",
        "Debe seleccionar solo una respuesta correcta",
        "error"
      );
      return false;
    }
    return true;
  };
  // Funcion de actualizar preguntas
  const updateQuestion = (ans, index, id, question, answers, timeQ) => {
    if (!validateOneAnswer(...ans)) {
      return;
    }
    const findQuestion = questions.find((question) => question.id_Q === id);
    const questionUpdate = { ...findQuestion, question, answers, timeQ };
    dispatch(questionUpdateSlice({ index, questionUpdate }));
    Swal.fire("Correcto", "Pregunta actualizada", "success");
    dispatch(updateQuestionThunk(questionUpdate, id));
    closeModal();
  };

  //  Modal para actualizar preguntas

  const isEmpyUpdateAnswer = (index) => {
    return (
      modalInfo.answers && JSON.parse(modalInfo.answers).answers[index].answer
    );
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#ee82ee";
  };

  const closeModal = () => {
    setModalInfo({});
    clearALlState();
    setIsOpen(false);
  };

  const addValueModal = (value) => {
    setModalInfo(value);
  };

  // funciones para eleminar pregunta
  const deleteQuestion = (id, question) => {
    console.log('id', id);
    
    const questionsNotDelete = questions.filter(
      (ques) =>  ques.id_Q !== id 
    );


    Swal.fire({
      title: "¿Estas seguro?",
      text: `Eliminaras la pregunta: ${question}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "Pregunta eliminada", "success");
        
        dispatch(deleteQuestionSlice({  questionsNotDelete}))
        dispatch(deleteQuestionThunk(id));
      }
    });
  };
  return {
    formState,
    changeInputs,
    saveQuestion,
    clearALlState,
    updateQuestion,
    validateOneAnswer,
    closeModal,
    openModal,
    afterOpenModal,
    modalIsOpen,
    isEmpyUpdateAnswer,
    modalInfo,
    addValueModal,

    // para eliminar pregunta
    deleteQuestion,
  };
};
