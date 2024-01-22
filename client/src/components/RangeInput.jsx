import InputLabel from "./InputLabel";
const RangeInput = (props) => {
  const { label, shownvalue = 0 } = props;
  return (
    <div className="mb-3 md:mb-4 block">
      <div className="flex items-center justify-between">
        <InputLabel label={label} />
        <span className="inline-block px-1.5 py-0.5 text-white text-center bg-primary rounded min-w-[50px]">
          {shownvalue}
        </span>
      </div>
      <input type="range" {...props} className="w-full mt-3" step={0.01} />
    </div>
  );
};

export default RangeInput;
