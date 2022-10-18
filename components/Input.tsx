import { IInput } from "../models";

const Input: React.FC<IInput> = ({
  classes,
  name,
  onChange,
  onBlur,
  placeholder,
}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className={`${classes}`}>
        <input
          id={name}
          name={name}
          onChange={handleOnChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${classes} shadow font-light p-2 border rounded-md focus:outline-none focus:border-blue-300 `}
        />
      </div>
    </div>
  );
};

export default Input;
