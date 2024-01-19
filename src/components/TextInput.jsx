import InputLabel from "./InputLabel";

const TextInput = (props) => {
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={props.label} labelId={props.name} />
      <input
        type="text"
        {...props}
        className="px-2.5 py-1.5 md:px-4 md:py-2.5 border-2 border-primary rounded-md w-full"
      />
    </div>
  );
};

export default TextInput;
