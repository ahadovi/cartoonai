import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { modelData, moduleData } from "../../constant/optionDatas";
import cn from "../../utils";
import FileImageInput from "../FileImageInput";
import RangeInput from "../RangeInput";
import SelectInput from "../SelectInput";
const ControlNetArgForm = (props) => {
  const {
    module,
    model,
    setModel,
    setModule,
    weight,
    setWeight,
    guidanceStart,
    setGuidanceStart,
    guidanceEnd,
    setGuidanceEnd,
    addControlnetArg,
    removeControlnetArg,
    previewImage,
    imageOnChange,
    loading,
    imageName,
    moduleName,
    modelName,
    weightName,
    guidanceStartName,
    guidanceEndName,
    disabled,
  } = props;
  const [addItem, setAddItem] = useState(true);
  const handleSetItem = () => {
    setAddItem(!addItem);
    if (addItem) {
      addControlnetArg();
    } else {
      removeControlnetArg();
    }
  };
  return (
    <div className="p-4 rounded-md bg-navLink mt-5">
      <div className="md:flex md:gap-6 md:items-start">
        <div className="w-full">
          <h3 className="font-medium mb-3">Select image:</h3>
          <FileImageInput
            previewImage={previewImage}
            onChange={imageOnChange}
            loading={loading}
            imageName={imageName}
            disabled={disabled}
          />
        </div>
        <div className="w-full">
          <SelectInput
            name={moduleName}
            label="Preprocessor Module"
            optiondata={moduleData}
            value={module}
            onChange={setModule}
            disabled={disabled}
          />
          <SelectInput
            name={modelName}
            label="Controlnet Model"
            optiondata={modelData}
            value={model}
            onChange={setModel}
            disabled={disabled}
          />
          <RangeInput
            label="Weight"
            name={weightName}
            shownvalue={weight}
            value={weight}
            onChange={setWeight}
            min={0}
            max={2}
            disabled={disabled}
          />
          <RangeInput
            label="Guidance Start"
            name={guidanceStartName}
            shownvalue={guidanceStart}
            value={guidanceStart}
            onChange={setGuidanceStart}
            min={0}
            max={1}
            disabled={disabled}
          />
          <RangeInput
            label="Guidance End"
            name={guidanceEndName}
            shownvalue={guidanceEnd}
            value={guidanceEnd}
            onChange={setGuidanceEnd}
            min={0}
            max={1}
            disabled={disabled}
          />
          <button
            className={cn(
              "bg-primary px-3 py-2 text-white rounded-md font-medium flex items-center gap-x-1.5 justify-center ml-auto",
              !addItem && "bg-red-700"
            )}
            onClick={handleSetItem}
            type="button"
            disabled={disabled}
          >
            <FontAwesomeIcon icon={addItem ? faPlus : faTrashAlt} />{" "}
            {addItem ? "Add" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlNetArgForm;
