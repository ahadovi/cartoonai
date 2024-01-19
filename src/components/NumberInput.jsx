import InputLabel from "./InputLabel";

const NumberInput = (props) => {
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={props.label} />
      <input
        {...props}
        type="number"
        className="px-4 py-2.5 border-2 border-primary rounded-md w-full bg-white"
        step="any"
      />
    </div>
  );
};

export default NumberInput;
