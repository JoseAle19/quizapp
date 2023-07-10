import AnyChart from "anychart-react";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import "../css/Grafics.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CountdownTimer } from "../../leaderTeam/components/CounterTime";
import { hookDoingtest } from "../../leaderTeam/hooks/hookDoingtest";
import { SeePdf } from "./SeePdf";
import { PDFViewer } from "@react-pdf/renderer";

export const GraficsPage = () => {
  const [users, setUsers] = useState([]);
  const { id, duration } = useParams();
  const [testIsActive, setTestIsActive] = useState(false);
  const { seconstOrMinutesByTest } = hookDoingtest();
  const [answersUser, setAnswersUser] = useState([]);
  const [seePdf, setseePdf] = useState(false);
  // Alert activar examen
  const handleEnableTest = () => {
    Swal.fire({
      title: "¿Estas seguro de activar el examen?",
      text: "Una vez activado el examen no se podra desactivar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, activar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("clientAdmin-enable-test", id);
        Swal.fire(
          "Examen activado",
          "El examen se activo correctamente",
          "success"
        );
      }
      setTestIsActive(true);
    });
  };

  useEffect(() => {
    const handleUser = (userConnected) => {
      const checkUser = users.some((user) => user.id === userConnected.id);
      if (!checkUser) {
        setUsers((previous) => [...previous, userConnected]);
      }
      return;
    };

    socket.on("server-newUserConnected", handleUser);
    socket.emit("admin-connected", id);
    return () => {
      socket.off("server-newUserConnected", handleUser);
      socket.off("admin-connected");
    };
  }, [users]);

  useEffect(() => {
    const handleQuestionsAnswered = ({ user, questionIndex }) => {
      const checkUser = users.some((u) => u.id === user.id);
      if (checkUser) {
        setUsers((previous) => {
          const userIndex = previous.findIndex((u) => u.id === user.id);
          let newUser = { ...previous[userIndex] };
          newUser.questionsAnswered = newUser.questionsAnswered || [];
          if (newUser.questionsAnswered.includes(questionIndex)) {
            return [...previous];
          }
          newUser.questionsAnswered = [
            ...newUser.questionsAnswered,
            questionIndex,
          ];
          previous[userIndex] = newUser;
          return [...previous];
        });
      }
    };

    const handleuserFinishTest = ({ user, questionsAnswered, timeDone }) => {
      const checkUser = answersUser.some((u) => u.user.id === user.id);
      if (checkUser) {
        console.log("El usuario ya termino el examen");
        return;
      }
      setAnswersUser((previous) => [
        ...previous,
        { user, questionsAnswered, timeDone },
      ]);
    };
    socket.on("server-user-DoneTest", handleuserFinishTest);
    socket.on("server-user-questionsAnswered", handleQuestionsAnswered);
    return () => {
      socket.off("server-user-questionsAnswered", handleQuestionsAnswered);
      socket.off("server-user-DoneTest", handleuserFinishTest);
    };
  }, [users]);

  const complexSettings = {
    width: 900,
    height: 400,
    type: "column3d",
    data: users.map((user) => {
      return {
        x: user.name,
        value: user.questionsAnswered ? user.questionsAnswered.length : 0,
        label: user.questionsAnswered ? user.questionsAnswered.length : 0,
      };
    }),
    title: "Datos del examen en curso",
    legend: {
      background: "lightgreen 0.4",
      padding: 5,
    },

    series: [
      {
        labels: {
          fontColor: "#e23838",
          anchor: "center",
          position: "center",
          offsetY: "-10",
        },
      },
    ],
    labels: {
      enabled: true,
      position: "center-top",
      fontSize: 15,
      fontFamily: "Helvetica",
      format: " Preguntas {%value}{decimalsCount:0}",
    },
  };

  const handleReport = () => {
    if (users.length < 1) {
      return Swal.fire({
        
        title: "No hay datos para generar reportes",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    console.log(answersUser);
    setseePdf(true);
  };
  return (
    <>
      {seePdf ? (
        <PDFViewer
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <SeePdf answersUser={answersUser} duration={duration} />
        </PDFViewer>
      ) : (
        <div>
          <div>
            {!testIsActive ? (
              <p>Tiempo del examen esta en espera....</p>
            ) : (
              <CountdownTimer
                minutes={seconstOrMinutesByTest(duration).minutes}
                seconds={seconstOrMinutesByTest(duration).seconds}
                onTimerEnd={() => {
                  localStorage.removeItem("timeLeft");
                }}
              />
            )}
            <h1 className="Grafics-title">Graficas del examen</h1>
            <button onClick={handleEnableTest}>Activar examen</button>
          </div>
          <section className="Grafics-container">
            {users.length < 1 ? (
              <h1 className="Grafics-DontGrafics">No hay datos para mostrar</h1>
            ) : (
              <AnyChart {...complexSettings} />
            )}

            <div>
              <button onClick={handleReport}>Hacer reportes</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
