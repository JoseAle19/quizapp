import "../css/CardQuestion.css";
export const CardQuestions = ({
  name, 
  changeInputs,
  value,
  placeholder,
  valueCheck,
  valueCheckName,
}) => {
  return (
    <>
      <div className="d-flex">
        <input
          name={name}
          onChange={changeInputs}
          value={value}
          className={`form-control mb-1 ${
            valueCheck
              ? "border  border-success border-2 border-top-0 border-end-0 border-start-0"
              : "border  border-danger border-2 border-top-0 border-end-0 border-start-0"
          }  `}
          // className= {``}
          type="text"
          placeholder={placeholder}
        />
        <input
          className="form-check-input m-2 p-2"
          type="checkbox"
          onChange={() => {
            changeInputs({
              target: {
                name: valueCheckName,
                value: !valueCheck,
              },
            });
          }}
          name={valueCheckName}
          value={valueCheck}
        />
      </div>
    </>
  );
};
