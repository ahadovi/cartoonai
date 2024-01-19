const InputLabel = ({ label = "", labelId = "" }) => {
  return (
    <label
      className="block md:text-base text-textColor font-medium mb-2 md:mb-2.5 text-sm"
      htmlFor={labelId}
    >
      {label}
    </label>
  );
};

export default InputLabel;
