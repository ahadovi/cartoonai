import { hrUpScalerData } from "../constant/optionDatas";
import cn from "../utils";
import NumberInput from "./NumberInput";
import RangeInput from "./RangeInput";
import SelectInput from "./SelectInput";
const EnableHr = (props) => {
  const {
    handleEnableHr,
    hrEnable,
    hrScale,
    setHrScale,
    hrSecondPassSteps,
    setHrSecondPassSteps,
    hrUpscaler,
    setHrUpscaler,
  } = props;
  return (
    <div className="mt-4 p-3 md:p-4 pb-1 rounded-md bg-navLink">
      <button
        type="button"
        className="bg-primary px-4 py-3 mb-4 text-white rounded-md font-medium flex items-center gap-x-3"
        onClick={handleEnableHr}
      >
        Enable Hr ?{" "}
        <span
          className={cn(
            "w-5 h-5 bg-white inline-block rounded",
            hrEnable && "bg-activeCheck"
          )}
        ></span>
      </button>

      <div className="">
        <div className="flex items-center gap-x-4">
          <div className="w-1/2">
            <RangeInput
              label="Hr Scale"
              name="hr_scale"
              value={Number(hrScale)}
              shownvalue={Number(hrScale)}
              onChange={setHrScale}
              disabled={!hrEnable}
              min={0}
              max={4}
            />
          </div>
          <div className="w-1/2">
            <NumberInput
              label="Hr Second Pass Steps (max: 150)"
              placeholder="Enter Hr Second Pass Steps"
              name="hr_second_pass_steps"
              value={Number(hrSecondPassSteps)}
              onChange={setHrSecondPassSteps}
              disabled={!hrEnable}
              min={1}
              max={150}
            />
          </div>
        </div>
        <SelectInput
          label="Hr Upscaler"
          name="hr_upscaler"
          optiondata={hrUpScalerData}
          value={hrUpscaler}
          onChange={setHrUpscaler}
          disabled={!hrEnable}
        />
      </div>
    </div>
  );
};

export default EnableHr;