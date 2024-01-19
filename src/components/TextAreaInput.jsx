import InputLabel from "./InputLabel";

const TextAreaInput = (props) => {
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={props.label} />
      <textarea
        {...props}
        className="px-4 py-2.5 border-2 border-primary rounded-md w-full min-h-[120px] bg-white"
      />
    </div>
  );
};

export default TextAreaInput;
