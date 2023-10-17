const RadioButton = ({ id, value, label, onChange, checked }) => {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        id={id}
        type="radio"
        name="distance"
        value={value}
        className="relative h-5 w-5 appearance-none rounded-[25px] border-[2px] border-solid border-black before:absolute before:left-[-2px] before:top-[-2px] before:h-5 before:w-5 before:rounded-[25px] before:opacity-0 before:ring-[8px] before:ring-inset before:ring-brand-700 before:content-[''] checked:before:opacity-100"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-1 flex items-center">
        <span className="text-black ">{label}</span>
      </span>
    </label>
  );
};

export default RadioButton;
