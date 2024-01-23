import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "../utils";

const FileImageInput = (props) => {
  const { previewImage, onChange, disabled } = props;
  return (
    <label
      className={cn(
        "flex items-center justify-center w-full min-h-[300px] mb-3 relative rounded-md overflow-hidden bg-[#D6CC99]",
        previewImage && "bg-navLink"
      )}
    >
      <input
        type="file"
        className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
        accept="image/*"
        required
        onChange={onChange}
        disabled={disabled}
      />
      {previewImage ? (
        <div className="group block relative cursor-pointer">
          <img
            src={previewImage}
            alt="Arg preview"
            className="block max-w-full"
          />
          <span className="absolute inset-0 flex justify-center items-center bg-secondary/[0.75] backdrop-blur-sm font-medium opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
            Click to Change Image
          </span>
        </div>
      ) : (
        <span className="font-medium text-xl md:text-2xl">
          <FontAwesomeIcon icon={faPlus} /> Add image
        </span>
      )}
    </label>
  );
};

export default FileImageInput;
