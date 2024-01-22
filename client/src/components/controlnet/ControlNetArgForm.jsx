import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modelData, moduleData } from "../../constant/optionDatas";
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
    handleAddItem,
    previewImage,
    imageOnChange,
    disabled,
    deletePreviewImage,
  } = props;

  return (
    <div className="p-4 rounded-md bg-navLink mt-5">
      <div className="md:flex md:gap-6 md:items-start">
        <div className="w-full mb-4">
          <h3 className="font-medium mb-3">Select image:</h3>
          <FileImageInput
            previewImage={previewImage}
            onChange={imageOnChange}
            disabled={disabled}
            deletePreviewImage={deletePreviewImage}
          />
        </div>
        <div className="w-full">
          <SelectInput
            name="module"
            label="Preprocessor Module"
            optiondata={moduleData}
            value={module}
            onChange={setModule}
            disabled={disabled}
          />
          <SelectInput
            name="model"
            label="Controlnet Model"
            optiondata={modelData}
            value={model}
            onChange={setModel}
            disabled={disabled}
          />
          <RangeInput
            label="Weight"
            name="weight"
            shownvalue={weight}
            value={weight}
            onChange={setWeight}
            min={0}
            max={2}
            disabled={disabled}
          />
          <RangeInput
            label="Guidance Start"
            name="guidance_start"
            shownvalue={guidanceStart}
            value={guidanceStart}
            onChange={setGuidanceStart}
            min={0}
            max={1}
            disabled={disabled}
          />
          <RangeInput
            label="Guidance End"
            name="guidance_end"
            shownvalue={guidanceEnd}
            value={guidanceEnd}
            onChange={setGuidanceEnd}
            min={0}
            max={1}
            disabled={disabled}
          />
          <button
            className="bg-primary px-3 py-2 text-white rounded-md font-medium flex items-center gap-x-1.5 justify-center ml-auto"
            onClick={handleAddItem}
            type="button"
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlNetArgForm;
