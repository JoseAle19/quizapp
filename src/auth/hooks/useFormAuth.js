// dependencias de react
import { useState } from "react";
// dependencias externas
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// Mis dependencias
import {  quizLogin } from "../../store/slices/authQuiz/thunks";

export const useFormAuth = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  // navigate 
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  // Router
  
  const onChangeInputs = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Iniciar sesión
  const login = async (e) => {
    e.preventDefault();
const res = await dispatch(quizLogin(formState))    
    if (!res.status) {
     return  Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.error[0]?.msg || res.error.msg || `${res.error} :(`,
      });
    }
    localStorage.setItem("user", JSON.stringify({ ...res.user, token: res.userToken }));
    // navigate("/quiz");

  };
  return {
    formState,
    onChangeInputs,
    login,
  };
};
