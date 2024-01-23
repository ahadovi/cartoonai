import axios from "axios";
import { useEffect, useState } from "react";
import EnableHr from "./components/EnableHr";
import FileImageInput from "./components/FileImageInput";
import NumberInput from "./components/NumberInput";
import OutputResult from "./components/OutputResult";
import RangeInput from "./components/RangeInput";
import Seed from "./components/Seed";
import SelectInput from "./components/SelectInput";
import TextAreaInput from "./components/TextAreaInput";
import ControlNetOne from "./components/controlnet-list/ControlNetOne";
import ControlNetThree from "./components/controlnet-list/ControlNetThree";
import ControlNetTwo from "./components/controlnet-list/ControlNetTwo";
import ControlNet from "./components/controlnet/ControlNet";
import {
  interfaceTypeData,
  modelNameData,
  samplerNameData,
  vaeNameData,
} from "./constant/optionDatas";
import { useAppContext } from "./providers/AppProvider";
import { ButtonLoaderSpinner } from "./ui/icons";
import { formatMilliseconds } from "./utils";

const App = () => {
  const {
    enableControlNet,
    setEnableControlNet,
    imagesArr,
    setImagesArr,
    controlNetArgArr,
  } = useAppContext();
  const [hrEnable, setHrEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processTime, setProcessTime] = useState("00:00");

  //== Input State
  const [inputData, setInputData] = useState({
    inference_type: "txt2img",
    model_name: "realcartoonPixar_v2.safetensors",
    vae_name: "color101VAE_v1.safetensors",
    prompt: "Flower, blue, <gender>",
    negative_prompt:
      "ugly, low resolution, disfigured, low quality, blurry, blur, nsfw, text, watermark, extra eye brew, poorly drawn face, bad, face, fused face, loned face, worst face, extra face, multiple faces, displaces face, poorly drawn dress.",
    seed: Number(1590328071),
    steps: Number(20),
    cfg_scale: Number(7.5),
    sampler_name: "Euler a",
    denoising_strength: Number(0.7),
    hr_scale: Number(1.2),
    hr_upscaler: "Latent (nearest-exact)",
    hr_second_pass_steps: Number(15),
  });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //== Image Preview
  const [previewImage, setPreviewImage] = useState("");
  const handleImg2ImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImagesArr((prev) => ({ ...prev, img2mg: file }));
    }
  };

  //= Create JSON File
  const [jsonFile, setJsonFile] = useState({});
  useEffect(() => {
    if (inputData?.inference_type === "img2img") {
      setJsonFile({
        inference_type: inputData?.inference_type,
        model_name: inputData?.model_name,
        vae_name: inputData?.vae_name,
        payload: {
          prompt: inputData?.prompt,
          negative_prompt: inputData?.negative_prompt,
          seed: Number(inputData?.seed),
          steps: Number(inputData?.steps),
          cfg_scale: Number(inputData?.cfg_scale),
          sampler_name: inputData?.sampler_name,
          denoising_strength: Number(inputData?.denoising_strength),
          alwayson_scripts: enableControlNet
            ? {
                controlnet: {
                  args: controlNetArgArr,
                },
              }
            : {},
        },
      });
    } else {
      setJsonFile({
        inference_type: inputData?.inference_type,
        model_name: inputData?.model_name,
        vae_name: inputData?.vae_name,
        payload: {
          prompt: inputData?.prompt,
          negative_prompt: inputData?.negative_prompt,
          seed: Number(inputData?.seed),
          steps: Number(inputData?.steps),
          cfg_scale: Number(inputData?.cfg_scale),
          sampler_name: inputData?.sampler_name,
          denoising_strength: Number(inputData?.denoising_strength),
          enable_hr: hrEnable,
          hr_scale: Number(inputData?.hr_scale),
          hr_upscaler: inputData?.hr_upscaler,
          hr_second_pass_steps: Number(inputData?.hr_second_pass_steps),
          alwayson_scripts: enableControlNet
            ? {
                controlnet: {
                  args: controlNetArgArr,
                },
              }
            : {},
        },
      });
    }
  }, [inputData, hrEnable, controlNetArgArr, enableControlNet]);

  //= Response Image Preview
  const [outputImage, setOutputImage] = useState(
    "https://placehold.co/700x500?text=Output+Image+Shown+Here"
  );

  //= Submit form json and images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = performance.now();

    //= Create json file
    const jsonString = JSON.stringify(jsonFile, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    //= Create Form Data
    const formData = new FormData();
    formData.append("json_data", blob, "sample_json_file.json");

    if (imagesArr?.img2mg !== "") {
      formData.append("image", imagesArr?.img2mg);
    }

    if (imagesArr?.controlnet_1 !== "") {
      formData.append("controlnet_1", imagesArr?.controlnet_1);
    }

    if (imagesArr?.controlnet_2 !== "") {
      formData.append("controlnet_2", imagesArr?.controlnet_2);
    }

    if (imagesArr?.controlnet_3 !== "") {
      formData.append("controlnet_3", imagesArr?.controlnet_3);
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_POST_API_ENDPOINT,
        formData
      );
      setOutputImage(`${response?.data["Download link"]}`);
      setLoading(false);
      const endTime = performance.now();
      const requestDuration = endTime - startTime;
      setProcessTime(formatMilliseconds(requestDuration));
      //= Scroll top
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMessage = `Error: ${error.response.data?.detail}\nStatus code: ${error.response.status}`;
        alert(errorMessage);
      } else if (error.request) {
        alert("No response received for the request");
      } else {
        alert(`Error message: ${error.message}`);
      }
      console.log("Config:", error.config);
    }
  };

  return (
    <div className="container my-6">
      <div className="md:flex md:gap-8 md:items-start">
        <div className="md:hidden">
          <OutputResult
            outputImage={outputImage}
            processTime={processTime}
            loading={loading}
            imageName="img2Img"
          />
        </div>
        <div className="bg-white p-3 md:p-5 rounded my-6 md:w-3/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  name="inference_type"
                  label="Interface Type"
                  value={inputData?.inference_type}
                  onChange={handleOnInputChange}
                  optiondata={interfaceTypeData}
                />
              </div>
              <div className="w-1/2">
                <SelectInput
                  name="model_name"
                  label="Model Name"
                  optiondata={modelNameData}
                  value={inputData?.model_name}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  name="vae_name"
                  label="Vae Name"
                  optiondata={vaeNameData}
                  value={inputData?.vae_name}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>

            {inputData?.inference_type === "img2img" ? (
              <div className="w-1/2 mb-4">
                <h3 className="font-medium mb-3">Select image:</h3>
                <FileImageInput
                  previewImage={previewImage}
                  onChange={handleImg2ImageChange}
                  disabled={loading}
                />
              </div>
            ) : null}

            <TextAreaInput
              label="Prompt"
              name="prompt"
              placeholder="Enter prompt"
              value={inputData?.prompt}
              onChange={handleOnInputChange}
            />

            <TextAreaInput
              label="Negative Prompt"
              name="negative_prompt"
              placeholder="Enter negative prompt"
              value={inputData?.negative_prompt}
              onChange={handleOnInputChange}
            />

            <Seed
              seed={Number(inputData?.seed)}
              setSeed={handleOnInputChange}
              seedNegativeBtn={() =>
                setInputData((prev) => ({ ...prev, seed: Number(-1) }))
              }
            />

            <div className="flex items-end gap-x-4">
              <div className="w-1/2">
                <NumberInput
                  label="Steps (max: 150)"
                  placeholder="Enter Steps"
                  name="steps"
                  value={Number(inputData?.steps)}
                  onChange={handleOnInputChange}
                  min={1}
                  max={150}
                />
              </div>
              <div className="w-1/2">
                <NumberInput
                  label="CFG Scale"
                  placeholder="Enter cfg scale"
                  name="cfg_scale"
                  value={Number(inputData?.cfg_scale)}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  label="Sampler Name"
                  name="sampler_name"
                  optiondata={samplerNameData}
                  value={inputData?.sampler_name}
                  onChange={handleOnInputChange}
                />
              </div>
              <div className="w-1/2">
                <RangeInput
                  label="Denoising Strength"
                  value={Number(inputData?.denoising_strength)}
                  shownvalue={Number(inputData?.denoising_strength)}
                  name="denoising_strength"
                  min={0}
                  max={1}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>

            {inputData?.inference_type !== "img2img" ? (
              <EnableHr
                handleEnableHr={() => setHrEnable(!hrEnable)}
                hrEnable={hrEnable}
                hrScale={inputData?.hr_scale}
                setHrScale={handleOnInputChange}
                hrSecondPassSteps={inputData?.hr_second_pass_steps}
                setHrSecondPassSteps={handleOnInputChange}
                hrUpscaler={inputData?.hr_upscaler}
                setHrUpscaler={handleOnInputChange}
              />
            ) : null}

            <div className="my-6">
              <ControlNet
                enableControlNet={enableControlNet}
                handleControlNet={() => setEnableControlNet(!enableControlNet)}
              >
                <ControlNetOne />
                <ControlNetTwo />
                <ControlNetThree />
              </ControlNet>
            </div>

            <div className="text-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary w-full mt-5 px-3 py-3 md:mt-0 md:px-5 md:py-3.5 rounded text-white font-medium md:text-xl inline-flex justify-center items-center disabled:bg-primary/[0.75] md:w-[200px]"
              >
                {loading ? (
                  <>
                    <ButtonLoaderSpinner /> Submit
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-2/5 hidden md:block">
          <OutputResult
            outputImage={outputImage}
            processTime={processTime}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
