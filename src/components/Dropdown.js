import "styles/Dropdown.css";
import modelUtil from "utils/modelUtil";

const Dropdown = ({ label, name, options, selectModel }) => {
  const { getModelName } = modelUtil();

  return (
    <>
      <section className="dropdown dropdown--column">
        <label className="dropdown__label" htmlFor={name}>
          {label}
        </label>
        <select
          className="dropdown__select"
          name={name}
          id="cars"
          onChange={selectModel}
        >
          <option className="dropdown__option" value="">
            {label}
          </option>
          {options.map((model, index) => (
            <option className="dropdown__option" value={model.name} key={index}>
              {getModelName(model.name)}
            </option>
          ))}
        </select>
      </section>
    </>
  );
};

export default Dropdown;
