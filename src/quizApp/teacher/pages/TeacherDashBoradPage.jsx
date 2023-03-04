import { NavTeacher } from "../ui/NavTeacher";

export const TeacherDashBoradPage = () => {
  return (
    <>
      <NavTeacher />
      <div className="container bg-gradient text-bg-success text-center p-4 mt-2 fs-4">
        <p>
          ¡Bienvenido a QuizApp! Selecciona una opción del menú para interactuar
          con la plataforma.
        </p>
      </div>
    </>
  );
};
