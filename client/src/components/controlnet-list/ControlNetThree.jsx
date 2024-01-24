import { useEffect, useState } from "react";
import { modelData } from "../../constant/optionDatas";
import { useAppContext } from "../../providers/AppProvider";
import ControlNetArgForm from "../controlnet/ControlNetArgForm";

const ControlNetThree = () => {
  const {
    setImagesArr,
    controlNetArgArr,
    setControlNetArgArr,
    enableControlNet,
  } = useAppContext();
  const [previewImage, setPreviewImage] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);
  const [uploadFile, setUploadFile] = useState("");
  const [enableArgument, setEnableArgument] = useState(true);
  const [argItem, setArgItem] = useState({
    module: "lineart_standard",
    model: "control_v11p_sd15_lineart",
    weight: Number(0.75),
    guidance_start: Number(0.2),
    guidance_end: Number(0.9),
    pixel_perfect: false,
  });

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    const numericValue = type === "range" ? parseFloat(value) : value;
    setArgItem((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  useEffect(() => {
    if (argItem?.module) {
      const filteredModels = modelData.filter((model) =>
        model.name.includes(argItem?.module.split("_")[0].toLowerCase())
      );
      setFilteredModels(filteredModels);

      if (filteredModels.length > 0) {
        setArgItem((prev) => ({ ...prev, model: filteredModels[0].value }));
      }
    }
  }, [argItem?.module]);

  const argImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUploadFile(file);
    }
  };

  const handleEnableArgument = () => {
    const index = controlNetArgArr?.findIndex((item) => item === argItem);
    setEnableArgument(!enableArgument);

    if (enableArgument) {
      setControlNetArgArr((prev) => [...prev, argItem]);
      if (uploadFile !== "") {
        setImagesArr((prev) => ({ ...prev, controlnet_3: uploadFile }));
      }
    } else {
      const newArr = controlNetArgArr?.filter((_, i) => index !== i);
      setControlNetArgArr(newArr);
      setImagesArr((prev) => ({ ...prev, controlnet_3: "" }));
    }
  };

  return (
    <>
      <ControlNetArgForm
        module={argItem?.module}
        model={argItem?.model}
        filteredModelsArr={filteredModels}
        setModel={handleOnChange}
        setModule={handleOnChange}
        weight={Number(argItem?.weight)}
        setWeight={handleOnChange}
        guidanceStart={Number(argItem?.guidance_start)}
        setGuidanceStart={handleOnChange}
        guidanceEnd={Number(argItem?.guidance_end)}
        setGuidanceEnd={handleOnChange}
        previewImage={previewImage}
        imageOnChange={argImageChange}
        disabled={!enableArgument || !enableControlNet}
        disableAddArgBtn={!enableControlNet}
        enableArgument={!enableArgument}
        handleEnableArgument={handleEnableArgument}
        enablePixelPerfect={argItem?.pixel_perfect}
        handleEnablePixelPerfect={() =>
          setArgItem((prev) => ({
            ...prev,
            pixel_perfect: !argItem?.pixel_perfect,
          }))
        }
      />
    </>
  );
};

export default ControlNetThree;
