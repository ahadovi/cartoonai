import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";

const Controlnet = (props) => {
  const { moduleOptionData, modelOptionData, value, setValue } = props;
  return (
    <div className="border-2 border-red-600 p-4 pb-0 rounded-md mt-4">
      <div className="grid grid-cols-2 gap-x-4">
        <SelectInput
          name="module"
          label="Module"
          optionData={moduleOptionData}
          value={value}
          onChange={setValue}
        />
        <SelectInput
          name="model"
          label="Model"
          optionData={modelOptionData}
          value={value}
          onChange={setValue}
        />
        <NumberInput
          label="Weight"
          placeholder="Enter weight"
          name="weight"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default Controlnet;
