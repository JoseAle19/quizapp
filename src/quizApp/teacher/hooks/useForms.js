import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addQuestion } from "../../../store/slices/questions/thunks";

export const useForms = (initialForm = {}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialForm);

  const changeInputs = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const saveQuestion = (e) => {
    e.preventDefault();
    const answers = [formState.s1, formState.s2, formState.s3, formState.s4];
    const data = answers.filter((answer) => answer === true);
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
    if (data.length < 1) {
      Swal.fire(
        "Error",
        "Debe seleccionar al menos una respuesta correcta",
        "error"
      );
      return;
    }
    if (data.length > 1) {
      Swal.fire(
        "Error",
        "Debe seleccionar solo una respuesta correcta",
        "error"
      );
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
    Swal.fire("Correcto", "Pregunta guardada", "success");
    console.log(initialForm);
    setFormState(initialForm);
  };
  return {
    formState,
    changeInputs,
    saveQuestion,
  };
};
