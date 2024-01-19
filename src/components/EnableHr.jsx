import React from "react";
import cn from "../utils";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
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
            hrEnable && "bg-green-400"
          )}
        ></span>
      </button>

      <div className="">
        <div className="flex items-center gap-x-4">
          <div className="w-1/2">
            <NumberInput
              label="Hr Scale"
              placeholder="Enter Hr Scale"
              name="hr_scale"
              value={Number(hrScale)}
              onChange={setHrScale}
              disabled={!hrEnable}
            />
          </div>
          <div className="w-1/2">
            <NumberInput
              label="Hr Second Pass Steps"
              placeholder="Enter Hr Second Pass Steps"
              name="hr_second_pass_steps"
              value={Number(hrSecondPassSteps)}
              onChange={setHrSecondPassSteps}
              disabled={!hrEnable}
            />
          </div>
        </div>
        <TextInput
          label="Hr Upscaler"
          name="hr_upscaler"
          placeholder="Enter Hr Upscaler"
          value={hrUpscaler}
          onChange={setHrUpscaler}
          disabled={!hrEnable}
        />
      </div>
    </div>
  );
};

export default EnableHr;
