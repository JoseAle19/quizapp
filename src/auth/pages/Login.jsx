import { useSelector } from "react-redux";
import "../css/loginPage.css";
import { useFormAuth } from "../hooks/";
import { Link} from "react-router-dom";
import { Loading } from "../../ui/components/Loading";
export const Login = () => {
  // redux
  const { status } = useSelector((state) => state.auth);

  const { onChangeInputs, formState, login } = useFormAuth({
    email: "",
    password: "",
  });
  const { email, password } = formState;
  return (
    <>
      <div className="login-contenedor">
        <div className="login-form">
          {status === "checking" && (
            <Loading/>
          )}
          <form>
            <h1>Inicio de sesión</h1>
            <div className="login-email">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="on"
                onChange={onChangeInputs}
              />
            </div>
            <div className="login-pass">
              <label htmlFor="email">Contraseña</label>
              <input
                type="password"
                name="password"
                value={password}
                autoComplete="on"
                onChange={onChangeInputs}
              />
            </div>

            <button
              className="loginPage-btn__login"
              disabled={status === "checking" ? true : false}
              onClick={(e) => login(e)}
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="loginPage-btn__register">
            <Link to={'/auth/register'} >
            Registrarse como asesor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
