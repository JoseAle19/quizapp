import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByTest } from "../../../store/slices/testSlice/thunks";
import { useDispatch, useSelector } from "react-redux";
import { RenderTable } from "../components/RenderTable";
import { Loading } from "../../../ui/components/Loading";
import { socket } from "../../../socket";
export const TableTest = () => {
  const { isLoading } = useSelector((state) => state.test);
  const questions = useSelector((state) => state.test.questionsByTest);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getQuestionByTest(id, 2023));
    const handleUser = (user) => {
      setUsers((previous) => [...previous, user]);
    };
    const handleUserDisconnected = (user) => {
      console.log(users);
      setUsers((previous) => previous.filter((u) => u.id !== user.id));
    };
    const handleUserAnswer = (data) => {
      const { user, questionIndex, answerIndex } = data;
      setAnswers((previous) => [
        ...previous,
        { user: user.id, questionIndex, answerIndex },
      ]);
    };
    // respuesta de usuario
    socket.on("server-user-answer", handleUserAnswer);

    socket.on("server-newUserConnected", handleUser);
    socket.on("server-user-disconnected", handleUserDisconnected);

    socket.emit("admin-connected", JSON.parse(localStorage.getItem("user")));
    return () => {
      socket.off("server-newUserConnected", handleUser);
      socket.off("server-user-disconnected", handleUserDisconnected);
      socket.off("server-user-answer", handleUserAnswer);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <RenderTable
          answers={answers}
          connectedUsers={users}
          nameQuestion={questions.questions}
          // answers={}
        />
      )}
    </div>
  );
};
