import InputLabel from "./InputLabel";

const SelectInput = (props) => {
  const { optiondata, label } = props;
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={label} />
      <select
        {...props}
        className="px-2.5 py-1.5 md:px-4 md:py-2.5 border-2 border-primary rounded-md w-full bg-white"
      >
        {optiondata &&
          optiondata?.map((item) => (
            <option value={item?.value} key={item?.id}>
              {item?.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInput;
