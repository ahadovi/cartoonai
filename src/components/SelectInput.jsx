import InputLabel from "./InputLabel";

const SelectInput = (props) => {
  return (
    <div className="mb-3 md:mb-4 block">
      <InputLabel label={props.label} />
      <select
        {...props}
        className="px-4 py-2.5 border-2 border-primary rounded-md w-full bg-white"
      >
        {props?.optionData?.map((item) => (
          <option value={item?.value} key={item?.id}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
