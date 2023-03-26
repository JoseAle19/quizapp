import { useSelector } from "react-redux";
import "../css/registerPage.css";
import { useFormRegister } from "../hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const RegisterPage = () => {
  const { statusRegister } = useSelector((state) => state.auth);

  const { form, onChangeInputs, handleSubmit } = useFormRegister({
    nameAdviser: "",
    emailAdviser: "",
    passwordAdviser: "",
    institutionAdviser: "",
    phoneAdviser: "",
    nameTeam: "",
    student1: "",
    isLeader1: false,
    student2: "",
    isLeader2: false,
    student3: "",
    isLeader3: false,
  });

  const {
    nameAdviser,
    emailAdviser,
    passwordAdviser,
    institutionAdviser,
    phoneAdviser,
    nameTeam,
    student1,
    student2,
    student3,
    isLeader1,
  } = form;

  return (
    <>
      <div className="registerPage-contenedor">
        <div className="registerPage-contenedor__form">
          <h1 className="registerPage-contenedor__form__title">
            Registrarse como asesor
          </h1>
          <form onSubmit={handleSubmit} className="registerPage-form_inputs">
            <input
              value={nameAdviser}
              name="nameAdviser"
              onChange={onChangeInputs}
              type="text"
              placeholder="Nombre del asesor"
            />
            <div className="registerPage-email_pass">
              <input
                value={emailAdviser}
                name="emailAdviser"
                onChange={onChangeInputs}
                type="email"
                placeholder="Correo"
              />
              <input
                value={passwordAdviser}
                name="passwordAdviser"
                onChange={onChangeInputs}
                type="password"
                placeholder="Contraseña"
                autoComplete=""
              />
            </div>
            <input
              value={institutionAdviser}
              name="institutionAdviser"
              onChange={onChangeInputs}
              type="text"
              placeholder="Institución de procedencia"
            />
            <input
              value={phoneAdviser}
              name="phoneAdviser"
              onChange={onChangeInputs}
              type="tel"
              placeholder="Numero de telefono"
            />
            <h2>Datos del equipo</h2>
            <input
              value={nameTeam}
              name="nameTeam"
              onChange={onChangeInputs}
              type="text"
              placeholder="Nombre del equipo"
            />
            <div className="registerPage_classMates">
              <div className="registerPage-row_classMate">
                <input
                  value={student1}
                  name="student1"
                  onChange={onChangeInputs}
                  className="isText"
                  type="text"
                  placeholder="Alumno 1"
                />
                <input
                  className="isCheck"
                  type="checkbox"
                  onChange={() =>
                    onChangeInputs({
                      target: {
                        name: "isLeader1",
                        value: !isLeader1,
                      },
                    })
                  }
                  value={isLeader1}
                  name="isLeader1"
                />
              </div>
              <div className="registerPage-row_classMate">
                <input
                  value={student2}
                  name="student2"
                  onChange={onChangeInputs}
                  className="isText"
                  type="text"
                  placeholder="Alumno 2"
                />
              </div>
              <div className="registerPage-row_classMate">
                <input
                  value={student3}
                  name="student3"
                  onChange={onChangeInputs}
                  className="isText"
                  type="text"
                  placeholder="Alumno 3"
                />
              </div>
            </div>
            <button
              disabled={statusRegister}
              type="submit"
              className={`registerPage-btn_register ${
                statusRegister && "btn-disable"
              }`}
            >
              {statusRegister ? "Espere...." : "Registrar"}
            </button>
          </form>
          {/* Regrsar ala pagina anterios */}
          <Link to="auth/login" className="registerPage-link_login">
            {"<"} Regresar
          </Link>
        </div>
      </div>
    </>
  );
};
