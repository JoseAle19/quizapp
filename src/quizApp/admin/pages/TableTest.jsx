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
      users.length < 1
        ? setUsers((previous) => [...previous, user])
        : users.map((u) => {
            if (u.id === user.id) {
              // SI el usuario existe ya no lo agrega
              console.log(questions);
              return;
            } else {
              setUsers((previous) => [...previous, user]);
            }
          });
    };
    const handleUserDisconnected = (user) => {
      setUsers((previous) => previous.filter((u) => u.id !== user.id));
    };

    const handleUserAnswer1 = ({ user, questionIndex, answerIndex }) => {
      const userExist = answers.find((u) => u.user === user.id);

      if (userExist) {
        const questionExist = userExist.questions.find(
          (q) => q.questionIndex === questionIndex
        );
        if (questionExist) {
          questionExist.answerIndex = answerIndex;
        } else {
          userExist.questions.push({ questionIndex, answerIndex });
        }
        setAnswers((previous) => [
          ...previous.filter((u) => u.user !== user.id),
          userExist,
        ]);
      } else {
        setAnswers((previous) => [
          ...previous,
          {
            user: user.id,
            questions: [
              {
                questionIndex,
                answerIndex,
              },
            ],
          },
        ]);
      }
    };

    const handleUserAnswer = (data) => {
      const { user, questionIndex, answerIndex } = data;
      setAnswers((previous) => [
        ...previous,
        { user: user.id, questionIndex, answerIndex },
      ]);
    };

    // respuesta de usuario
    socket.on("server-user-answer", handleUserAnswer1);
    // usuario conectado lider del equipo
    socket.on("server-newUserConnected", handleUser);
    socket.on("server-user-disconnected", handleUserDisconnected);
    socket.emit("admin-connected", JSON.parse(localStorage.getItem("user")));

    return () => {
      socket.off("server-newUserConnected", handleUser);
      socket.off("server-user-disconnected", handleUserDisconnected);
      socket.off("server-user-answer", handleUserAnswer1);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [users, answers]);

  return (
    <div>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
      {isLoading ? (
        <Loading />
      ) : (
        <RenderTable
          answers={answers}
          connectedUsers={users}
          nameQuestion={questions.questions}
        />
      )}
    </div>
  );
};
