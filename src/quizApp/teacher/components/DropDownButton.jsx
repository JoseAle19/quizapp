export const DropDownButton = ({ changeInputs, categories, label, value }) => {
  return (
    <div className="m-4">
      <select
        value={value}
        className="form-select"
        onChange={({ target }) => {
          changeInputs({
            target: {
              name: "idCategory",
              value: parseInt(target.value),
            },
          });
        }}
      >
        <option value="0">{label}</option>
        {categories.map((categorie) => {
          return (
            <option
              key={categorie.id}
              name="idCategory"
              value={parseInt(categorie.id)}
            >
              {categorie.description}
            </option>
          );
        })}
      </select>
    </div>
  );
};
