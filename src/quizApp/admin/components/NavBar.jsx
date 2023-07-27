import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="  row row-cols-auto  align-items-center">
      <Link  replace={true} to={'/home-admin/'} >
        <div className=" btn btn-primary text-white font-weight-bold">inicio</div>
      </Link>
      <Link replace={true} to={'/home-admin/create-question'}>
        <div className="btn btn-primary text-white font-weight-bold">Crear Preguntas</div>
      </Link>
      <Link  replace={true} to={'/home-admin/questions'}>
        <div className="btn btn-primary text-white font-weight-bold">Preguntas</div>
      </Link>
      <Link  replace={true} to={'/home-admin/view-test'}>
        <div className="btn btn-primary text-white font-weight-bold">Ver examenes</div>
      </Link>
      <Link  replace={true} to={'/home-admin/create-test'}>
        <div className="btn btn-primary text-white font-weight-bold">Crear examen</div>
      </Link>
    </div>
  );
};
