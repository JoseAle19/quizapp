import "../css/registerPage.css";

export const RegisterPage = () => {


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hola");
  };

  return (
    <>
      <div className="registerPage-contenedor">
        <div className="registerPage-contenedor__form">
          <h1 className="registerPage-contenedor__form__title">
            Registrarse como asesor
          </h1>
          <form  onSubmit={ handleSubmit } className="registerPage-form_inputs">
            <input type="text" placeholder="Nombre del asesor" />
            <div className="registerPage-email_pass">
              <input type="email" placeholder="Correo" />
              <input type="password" placeholder="Contraseña" autoComplete="" />
            </div>
            <input type="text" placeholder="Institución de procedencia" />
            <input type="tel" placeholder="Numero de telefono" />
            <h2  >Datos del equipo</h2>
            <input type="text" placeholder="Nombre del equipo" />
            <div>
              <div className="registerPage-row_classmate">
                <input type="text" placeholder="Alumno 1" />
                <input type="text" placeholder="Alumno 2" />
              </div>
              <div className="registerPage-row_classmate">
                <input type="text" placeholder="Alumno 3" />
                <input type="text" placeholder="Alumno 4" />
              </div>
            </div>
            <button  type="submit" className="registerPage-btn_register" >Registrase</button>
          </form>
        </div>
      </div>
    </>
  );
};
