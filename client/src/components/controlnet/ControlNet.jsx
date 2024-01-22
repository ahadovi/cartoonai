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
    <div className="p-3 border-2 border-secondary rounded-md mt-5">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          className="bg-primary px-4 py-3 text-white rounded-md font-medium flex items-center gap-x-3"
          type="button"
          onClick={handleControlNet}
        >
          Enable Controlnet ?{" "}
          <span
            className={cn(
              "w-5 h-5 bg-white inline-block rounded",
              enableControlNet && "bg-activeCheck"
            )}
          ></span>
        </button>
        <button
          className="bg-primary px-4 py-3 text-white rounded-md font-medium flex items-center gap-x-3 disabled:bg-primary/[0.85]"
          type="button"
          onClick={handleEnablePixelPerfect}
          disabled={!enableControlNet}
        >
          Enable Pixel Perfect ?{" "}
          <span
            className={cn(
              "w-5 h-5 bg-white inline-block rounded",
              enablePixelPerfect && "bg-activeCheck"
            )}
          ></span>
        </button>
      </div>
      {children}
    </div>
  );
};

export default ControlNet;
