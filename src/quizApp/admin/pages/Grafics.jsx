import AnyChart from "anychart-react";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
export const GraficsPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Funcion que se ejecuta cuando se conecta un usuario

    const handleUser = (user) => {
      setUsers((previous) => [...previous, user]);
    };
    // Funcion que se ejecuta cuando se desconecta un usuario
    const handleUserDisconnected = (user) => {
      setUsers((previous) => previous.filter((u) => u.id !== user.id));
    };
    // socket cuando el usaurio lider del equipo se conecta
    socket.on("server-newUserConnected", handleUser);
    // socket cuando el usaurio lider del equipo se desconecta
    socket.on("server-user-disconnected", handleUserDisconnected);

    return () => {
      // limpiar los socket
      socket.off("server-newUserConnected", handleUser);
      socket.off("server-user-disconnected", handleUserDisconnected);
    };
  }, []);

  const puntosPorUsuario = users.reduce((acc, usuario) => {
    acc[usuario.name] = (acc[usuario.name] || 0) + 1;
    return acc;
  }, {});

  const puntosString = Object.keys(puntosPorUsuario)
    .map((key) => {
      return `${key},${puntosPorUsuario[key]}`;
    })
    .join("\n");
  console.log(puntosString);
  const complexSettings = {
    width: 700,
    height: 600,
    type: "column",
    data: users.map((user) => {
      return { x: user.name, value: Math.random() * 100 };
    }),
    title: "Datos del examen en curso",
    // yAxis: [
    //   1,
    //   {
    //     orientation: "right",
    //     enabled: true,
    //     labels: {
    //       format: "{%Value}",
    //       fontColor: "red",
    //     },
    //   },
    // ],
    legend: {
      background: "lightgreen 0.4",
      padding: 5,
    },
  };
  return (
    <>
      <h1>Graficas del examen</h1>
      <section>
        {users.length < 1 ? (
          <h1>No hay datos para mostrar</h1>
        ) : (
          <AnyChart {...complexSettings} />
        )}
      </section>
    </>
  );
};
