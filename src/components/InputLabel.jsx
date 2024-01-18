const InputLabel = ({ label = "", labelId = "" }) => {
  return (
    <label
      className="block text-label text-textColor font-medium mb-2.5"
      htmlFor={labelId}
    >
      {label}
    </label>
  );
};

export default InputLabel;
