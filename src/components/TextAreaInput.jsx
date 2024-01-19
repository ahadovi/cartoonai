import InputLabel from "./InputLabel";

const TextAreaInput = (props) => {
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={props.label} />
      <textarea
        {...props}
        className="px-2.5 py-1.5 md:px-4 md:py-2.5 border-2 border-primary rounded-md w-full min-h-[120px] bg-white"
      />
    </div>
  );
};

export default TextAreaInput;
