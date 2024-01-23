import { useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import ControlNetArgForm from "../controlnet/ControlNetArgForm";

const ControlNetOne = () => {
  const {
    setImagesArr,
    controlNetArgArr,
    setControlNetArgArr,
    enableControlNet,
  } = useAppContext();
  const [previewImage, setPreviewImage] = useState("");
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
    const { name, value } = e.target;
    setArgItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const argImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImagesArr((prev) => ({ ...prev, controlnet_1: file }));
    }
  };

  const handleEnableArgument = () => {
    const index = controlNetArgArr?.findIndex((item) => item === argItem);
    setEnableArgument(!enableArgument);

    if (enableArgument) {
      setControlNetArgArr((prev) => [...prev, argItem]);
    } else {
      const newArr = controlNetArgArr?.filter((_, i) => index !== i);
      setControlNetArgArr(newArr);
      setImagesArr((prev) => ({ ...prev, controlnet_1: "" }));
    }
  };

  return (
    <>
      <ControlNetArgForm
        module={argItem?.module}
        model={argItem?.model}
        setModel={handleOnChange}
        setModule={handleOnChange}
        weight={argItem?.weight}
        setWeight={handleOnChange}
        guidanceStart={argItem?.guidance_start}
        setGuidanceStart={handleOnChange}
        guidanceEnd={argItem?.guidance_end}
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

export default ControlNetOne;
