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
    previewImage,
    imageOnChange,
    disabled,
    enableArgument,
    handleEnableArgument,
    enablePixelPerfect,
    handleEnablePixelPerfect,
    disableAddArgBtn,
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
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <button
              className="bg-primary px-2.5 py-2 text-white rounded-md font-medium flex items-center gap-x-3 text-sm 2xl:text-base disabled:bg-primary/[0.85]"
              type="button"
              onClick={handleEnableArgument}
              disabled={disableAddArgBtn}
            >
              Add Argument ?{" "}
              <span
                className={cn(
                  "w-4 h-4 bg-white inline-block rounded",
                  enableArgument && "bg-activeCheck"
                )}
              ></span>
            </button>
            <button
              className="bg-primary px-2.5 py-2 text-white rounded-md font-medium flex items-center gap-x-3 disabled:bg-primary/[0.85] text-sm 2xl:text-base"
              type="button"
              onClick={handleEnablePixelPerfect}
              disabled={disabled}
            >
              Pixel Perfect ?{" "}
              <span
                className={cn(
                  "w-4 h-4 bg-white inline-block rounded",
                  enablePixelPerfect && "bg-activeCheck"
                )}
              ></span>
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ControlNetArgForm;
