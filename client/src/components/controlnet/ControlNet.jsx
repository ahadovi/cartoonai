import cn from "../../utils";
const ControlNet = (props) => {
  const { enableControlNet, handleControlNet, children } = props;
  return (
    <div className="p-3 border-2 border-secondary rounded-md mt-5">
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
      {children}
    </div>
  );
};

export default ControlNet;
