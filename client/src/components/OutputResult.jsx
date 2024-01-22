import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";

const OutputResult = (props) => {
  const { outputImage, processTime, loading } = props;
  const downloadImage = () => {
    saveAs(outputImage, "output-image.jpg");
  };
  return (
    <>
      <div className="bg-white p-6 rounded mt-6 shadow-md shadow-slate-300">
        <h3 className="text-xl font-medium mb-3">Output result Image:</h3>
        <img
          src={outputImage}
          alt="response image"
          id="responseImage"
          className="max-w-full h-auto rounded"
        />
      </div>
      <div className="bg-white px-6 py-4 rounded mt-6 shadow-md shadow-slate-300 flex items-center justify-between">
        <div className="">
          <span className="font-medium">Processing Time:</span>
          <span className="rounded-full bg-green-600 text-white text-base inline-block px-3 py-1.5 leading-none ml-3">
            {processTime} sec
          </span>
        </div>

        <button
          className="bg-primary text-white px-6 py-2 rounded-md text-xl flex items-center gap-x-2 justify-center disabled:bg-primary/[0.85]"
          onClick={downloadImage}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faCloudDownload} /> Download
        </button>
      </div>
    </>
  );
};

export default OutputResult;