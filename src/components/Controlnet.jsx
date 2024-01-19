import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modelData, moduleData } from "../constant/optionDatas";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";

const Controlnet = (props) => {
  const {
    model,
    module,
    weight,
    setModel,
    setModule,
    setWeight,
    addControlnet,
  } = props;
  return (
    <div className="bg-navLink p-3 md:px-6 md:py-4 rounded-md mt-4">
      <div className="grid grid-cols-2 gap-x-4">
        <SelectInput
          name="module"
          label="Module"
          optiondata={moduleData}
          value={module}
          onChange={setModule}
        />
        <SelectInput
          name="model"
          label="Model"
          optiondata={modelData}
          value={model}
          onChange={setModel}
        />
        <NumberInput
          label="Weight"
          placeholder="Enter weight"
          name="weight"
          value={weight}
          onChange={setWeight}
        />
      </div>
      <button
        className="mt-1 bg-primary text-white py-3 px-4 font-medium rounded-md flex items-center gap-x-2"
        onClick={addControlnet}
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Controlnet
      </button>
    </div>
  );
};

export default Controlnet;
