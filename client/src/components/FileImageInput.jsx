import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "../utils";

const FileImageInput = (props) => {
  const {
    previewImage,
    onChange,
    loading,
    deletePreviewImage,
    imageName = "",
  } = props;
  return (
    <label
      htmlFor="argImageOne"
      className={cn(
        "flex items-center justify-center w-full min-h-[300px] relative rounded-md overflow-hidden bg-[#D6CC99]",
        previewImage && "bg-navLink"
      )}
    >
      <input
        type="file"
        id="argImageOne"
        name={imageName}
        className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
        accept="image/*"
        required
        onChange={onChange}
        disabled={loading}
      />
      {previewImage ? (
        <div className="block relative">
          <img
            src={previewImage}
            alt="Arg preview"
            className="block max-w-full"
          />
          <button
            type="button"
            className="absolute right-3 top-3 z-10 text-white p-2 rounded bg-red-700 leading-none text-sm"
            onClick={deletePreviewImage}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
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
