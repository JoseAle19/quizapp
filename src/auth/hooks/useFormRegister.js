import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerTeam } from "../../store/slices/authQuiz/thunks";
import Swal from "sweetalert2";
export const useFormRegister = (initialtate = {}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialtate);

  const onChangeInputs = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const students = [
    {
      student1: form.student1,
      isLeader: form.isLeader1,
    },
    {
      student2: form.student2,
      isLeader: form.isLeader2,
    },
    {
      student3: form.student3,
      isLeader: form.isLeader3,
    },
  ];

  // Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      student1,
      isLeader1,
      student2,
      isLeader2,
      student3,
      isLeader3,
      ...data
    } = form;

    data.students = students;
      // Colocar el id del rol de la base de datos
        
    data.idrol =4;
    // Validaciones del form
    const {
      nameAdviser,
      emailAdviser,
      passwordAdviser,
      phoneAdviser,
      institutionAdviser,
      idrol,
      nameTeam,
    } = data;

    if (nameAdviser.length < 1) {
      return messages(
        "warning",
        "Nombre no valido",
        "ingresa nombre del asesor",
        1500
      );
    }

    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(emailAdviser)) {
      return messages(
        "warning",
        "Correo no valido",
        "Correo electronico no valido",
        1500
      );
    }
    if (passwordAdviser < 5) {
      return messages(
        "warning",
        "Contraseña invalida",
        "Contraseña demaciada debil",
        1500
      );
    }

    if (institutionAdviser.length < 5) {
      return messages(
        "warning",
        "institución  invalida",
        "Nombre de la institucion no valida",
        1500
      );
    }
    if (phoneAdviser.length < 10) {
      return messages(
        "warning",
        "Telefono invalido",
        "Numero de telefono debe ser 10 digitos",
        1500
      );
    }

    const [e1, e2, e3] = students;

    if (
      e1.student1.length < 5 ||
      e2.student2.length < 5 ||
      e3.student3.length < 5
    ) {
      return messages(
        "warning",
        `Integrantes incompletos del equipo ${nameTeam}`,
        `${
          (e1.student1.length < 5 && "Alumno 1, nombre incompleto") ||
          (e2.student2.length < 5 && "Alumno 2, nombre incompleto") ||
          (e3.student3.length < 5 && "Alumno 3, nombre incompleto")
        }`,
        2000
      );
    }
    const countLeaders = students.filter(
      (student) => student.isLeader === false
    );
    console.log(countLeaders.length);
    if (countLeaders.length === 3) {
      return messages(
        "error",
        "Sin lider",
        "Elige un lider para el equipo",
        1000
      );
    }
    const res = await dispatch(registerTeam(data));

    if (res.status === false) {
      return messages(
        "error",
        "Verifica tus datos",
        res.error[0].msg.toString(),
        1500
      );
    }
    
    return messages(
      "success",
      "Asesor y equipo registrados",
      res.msg.toString(),
      1500
    );
  };
  return {
    form,
    onChangeInputs,
    handleSubmit,
  };
};

const messages = (icon, title, info, time) => {
  return Swal.fire({
    icon,
    title,
    text: info,
    timer: time,
  });
};
