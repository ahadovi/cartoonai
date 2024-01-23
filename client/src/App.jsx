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
    setImagesArr,
    controlNetArgArr,
  } = useAppContext();
  const [hrEnable, setHrEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processTime, setProcessTime] = useState("00:00");

  //== Input State
  const [inferenceType, setInferenceType] = useState("txt2img");
  const [modelName, setModelName] = useState("realcartoonPixar_v2.safetensors");
  const [vaeName, setVaeName] = useState("color101VAE_v1.safetensors");
  const [prompt, setPrompt] = useState("Flower, blue, <gender>");
  const [negativePrompt, setNegativePrompt] = useState(
    "ugly, low resolution, disfigured, low quality, blurry, blur, nsfw, text, watermark, extra eye brew, poorly drawn face, bad, face, fused face, loned face, worst face, extra face, multiple faces, displaces face, poorly drawn dress."
  );
  const [seed, setSeed] = useState(1590328071);
  const [steps, setSteps] = useState(20);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [samplerName, setSamplerName] = useState("Euler a");
  const [denoisingStrength, setDenoisingStrength] = useState(0.7);
  const [hrScale, setHrScale] = useState(1.2);
  const [hrUpscaler, setHrUpscaler] = useState("Latent (nearest-exact)");
  const [hrSecondPassSteps, setHrSecondPassSteps] = useState(15);

  const [inputData, setInputData] = useState({
    inferenceType: "txt2img",
    modelName: "realcartoonPixar_v2.safetensors",
    vaeName: "color101VAE_v1.safetensors",
    prompt: "Flower, blue, <gender>",
    negativePrompt:
      "ugly, low resolution, disfigured, low quality, blurry, blur, nsfw, text, watermark, extra eye brew, poorly drawn face, bad, face, fused face, loned face, worst face, extra face, multiple faces, displaces face, poorly drawn dress.",
    seed: Number(1590328071),
    steps: Number(20),
    cfgScale: Number(7.5),
    samplerName: "Euler a",
    denoisingStrength: Number(0.7),
    hrScale: Number(1.2),
    hrUpscaler: "Latent (nearest-exact)",
    hrSecondPassSteps: Number(15),
  });

  //= Create JSON File
  const [jsonFile, setJsonFile] = useState({});

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
      setImagesArr((prev) => ({ ...prev, img2img: file }));
    }
  };

  //= Default Value Of jSON file
  useEffect(() => {
    setJsonFile({
      inference_type: inferenceType,
      model_name: modelName,
      vae_name: vaeName,
      payload: {
        prompt: prompt,
        negative_prompt: negativePrompt,
        seed: seed,
        steps: steps,
        cfg_scale: cfgScale,
        sampler_name: samplerName,
        denoising_strength: denoisingStrength,
        enable_hr: hrEnable,
        hr_scale: hrScale,
        hr_upscaler: hrUpscaler,
        hr_second_pass_steps: hrSecondPassSteps,
        alwayson_scripts: enableControlNet
          ? {
              controlnet: {
                args: controlNetArgArr,
              },
            }
          : {},
      },
    });
  }, [
    inferenceType,
    modelName,
    vaeName,
    prompt,
    negativePrompt,
    seed,
    steps,
    cfgScale,
    samplerName,
    denoisingStrength,
    hrEnable,
    hrScale,
    hrUpscaler,
    hrSecondPassSteps,
    enableControlNet,
    controlNetArgArr,
  ]);

  console.log(jsonFile);

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
    if (uploadImage) {
      for (let i = 0; i < uploadImage.length; i++) {
        formData.append("image", uploadImage[i]);
      }
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_POST_API_ENDPOINT,
        formData
      );
      setOutputImage(`${response?.data["Download link"][0]}`);
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
                  value={inferenceType}
                  onChange={(e) => setInferenceType(e.target.value)}
                  optiondata={interfaceTypeData}
                />
              </div>
              <div className="w-1/2">
                <SelectInput
                  name="model_name"
                  label="Model Name"
                  optiondata={modelNameData}
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  name="vae_name"
                  label="Vae Name"
                  optiondata={vaeNameData}
                  value={vaeName}
                  onChange={(e) => setVaeName(e.target.value)}
                />
              </div>
            </div>

            {inferenceType === "img2img" ? (
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <TextAreaInput
              label="Negative Prompt"
              name="negative_prompt"
              placeholder="Enter negative prompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />

            <Seed
              seed={Number(seed)}
              setSeed={(e) => setSeed(Number(e.target.value))}
              seedNegativeBtn={() => setSeed(-1)}
            />

            <div className="flex items-end gap-x-4">
              <div className="w-1/2">
                <NumberInput
                  label="Steps (max: 150)"
                  placeholder="Enter Steps"
                  name="steps"
                  value={Number(steps)}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  min={1}
                  max={150}
                />
              </div>
              <div className="w-1/2">
                <NumberInput
                  label="CFG Scale"
                  placeholder="Enter cfg scale"
                  name="cfg_scale"
                  value={Number(cfgScale)}
                  onChange={(e) => setCfgScale(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  label="Sampler Name"
                  name="sampler_name"
                  optiondata={samplerNameData}
                  value={samplerName}
                  onChange={(e) => setSamplerName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <RangeInput
                  label="Denoising Strength"
                  value={Number(denoisingStrength)}
                  shownvalue={Number(denoisingStrength)}
                  name="denoising_strength"
                  min={0}
                  max={1}
                  onChange={(e) => setDenoisingStrength(Number(e.target.value))}
                />
              </div>
            </div>

            <EnableHr
              handleEnableHr={() => setHrEnable(!hrEnable)}
              hrEnable={hrEnable}
              hrScale={hrScale}
              setHrScale={(e) => setHrScale(Number(e.target.value))}
              hrSecondPassSteps={hrSecondPassSteps}
              setHrSecondPassSteps={(e) =>
                setHrSecondPassSteps(Number(e.target.value))
              }
              hrUpscaler={hrUpscaler}
              setHrUpscaler={(e) => setHrUpscaler(e.target.value)}
            />

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
