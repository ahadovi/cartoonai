import cn from "../../utils";
const ControlNet = (props) => {
  const {
    enableControlNet,
    handleControlNet,
    enablePixelPerfect,
    handleEnablePixelPerfect,
    children,
  } = props;
  return (
    <div className="p-3 border-2 border-[#D6CC99] rounded-md mt-5">
      <div className="flex items-center gap-x-4">
        <button
          className="bg-primary px-4 py-3 text-white rounded-md font-medium flex items-center gap-x-3"
          type="button"
          onClick={handleControlNet}
        >
          Enable Controlnet ?{" "}
          <span
            className={cn(
              "w-5 h-5 bg-white inline-block rounded",
              enableControlNet && "bg-green-400"
            )}
          ></span>
        </button>
        <button
          className="bg-primary px-4 py-3 text-white rounded-md font-medium flex items-center gap-x-3"
          type="button"
          onClick={handleEnablePixelPerfect}
        >
          Enable Pixel Perfect ?{" "}
          <span
            className={cn(
              "w-5 h-5 bg-white inline-block rounded",
              enablePixelPerfect && "bg-green-400"
            )}
          ></span>
        </button>
      </div>
      {/* <ControlNetArgCard
        module={module}
        model={model}
        setModel={onChange}
        setModule={onChange}
        weight={weight}
        setWeight={onChange}
        guidanceStart={guidanceStart}
        setGuidanceStart={onChange}
        guidanceEnd={guidanceEnd}
        setGuidanceEnd={onChange}
        addControlnetArg={addControlnetArg}
        removeControlnetArg={removeControlnetArg}
        previewImage={previewImage}
        imageOnChange={imageOnChange}
        loading={loading}
        imageName="argOneImage"
        moduleName="argOneModule"
        modelName="argOneModelName"
        weightName="argOneWeight"
        guidanceStartName="argOneGuidanceStart"
        guidanceEndName="argOneGuidanceEndName"
      /> */}
      {children}
    </div>
  );
};

export default ControlNet;
