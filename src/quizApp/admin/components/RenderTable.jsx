import "../css/TableQuestions.css";
export const RenderTable = ({ connectedUsers, nameQuestion, answers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="RenderTable-card">Nombre</th>
          {nameQuestion &&
            nameQuestion.map((question, index) => (
              <th className="table-question" key={index}>
                {question.question}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {connectedUsers.map((user) => (
          <tr key={user.id}>
            <td className="RenderTable-card">
              <span>{user.name}</span>
            </td>
            {nameQuestion.map((question, indexQuestion) => {
              const answerIndex = answers.findIndex(
                (answer) =>
                  answer.questionIndex == indexQuestion &&
                  answer.user == user.id
              );
              const answer = answerIndex !== -1 ? answers[answerIndex] : null;

              return (
                <td
                  className="RenderTable-card"
                  key={`question-${indexQuestion}-${question.question}`}
                >
                  <div className="RenderTable-box-isCorrect">
                    <input
                      type="checkbox"
                      checked={answer && answer.answerIndex.correct}
                      disabled
                    />
                    <span
                      className={
                        answer && answer.answerIndex.correct
                          ? "RenderTable-isCorrect"
                          : "RenderTable-isCorrect-false"
                      }
                    >
                      {answer && answer.answerIndex.answer}
                    </span>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
