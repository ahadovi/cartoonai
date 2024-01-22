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
import ArgumentCard from "./components/controlnet/ArgumentCard";
import ControlNet from "./components/controlnet/ControlNet";
import ControlNetArgForm from "./components/controlnet/ControlNetArgForm";
import {
  interfaceTypeData,
  modelNameData,
  samplerNameData,
  vaeNameData,
} from "./constant/optionDatas";
import { ButtonLoaderSpinner } from "./ui/icons";
import { formatMilliseconds } from "./utils";

const App = () => {
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
  // const [module, setModule] = useState("lineart_standard");
  // const [model, setModel] = useState("control_v11p_sd15_lineart");
  // const [weight, setWeight] = useState(0.75);

  //= Create JSON File
  const [jsonFile, setJsonFile] = useState({});

  //= ControlNet Area
  const [enableControlNet, setEnableControlNet] = useState(false);
  const [enablePixelPerfect, setEnablePixelPerfect] = useState(false);
  const [controlnetArgArr, setControlnetArgArr] = useState([]);
  //= ControlTet Arg One inputs
  const [controlNetArgOneObj, setControlNetArgOneObj] = useState({
    argOneModule: "lineart_standard",
    argOneModel: "control_v11p_sd15_lineart",
    argOneWeight: Number(0.75),
    argOneGuidanceStart: Number(0.2),
    argOneGuidanceEnd: Number(0.9),
  });

  const handleControlNetOneChange = (e) => {
    const { name, value } = e.target;
    setControlNetArgOneObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddControlNetOne = () => {
    setControlnetArgArr((prev) => [
      ...prev,
      {
        module: controlNetArgOneObj?.argOneModule,
        model: controlNetArgOneObj?.argOneModel,
        weight: controlNetArgOneObj?.argOneWeight,
        guidance_start: controlNetArgOneObj?.argOneGuidanceStart,
        guidance_end: controlNetArgOneObj?.argOneGuidanceEnd,
      },
    ]);
  };

  const handleRemoveControlNetItem = (indexId) => {
    const newControlNetArgArr = controlnetArgArr.filter(
      (_, i) => indexId !== i
    );
    setControlnetArgArr(newControlNetArgArr);
  };

  //= ControlTet Arg Two inputs
  const [controlNetArgTwoObj, setControlNetArgTwoObj] = useState({
    argTwoModule: "lineart_standard",
    argTwoModel: "control_v11p_sd15_lineart",
    argTwoWeight: Number(0.5),
    argTwoGuidanceStart: Number(0),
    argTwoGuidanceEnd: Number(0.45),
  });

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
        pixel_perfect: enablePixelPerfect,
        alwayson_scripts: enableControlNet
          ? {
              controlnet: {
                args: controlnetArgArr,
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
    controlnetArgArr,
    enableControlNet,
    enablePixelPerfect,
  ]);

  //= Response Image Preview
  const [outputImage, setOutputImage] = useState(
    "https://placehold.co/700x500?text=Placeholder+output+image"
  );

  //== Image Preview
  const [previewImage, setPreviewImage] = useState("");
  const [uploadImage, setUploadImage] = useState([]);
  const changePreviewImage = (evt) => {
    const { name } = evt.target;
    const file = evt.target.files[0];
    console.log(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUploadImage((prev) => [...prev, file]);
    }
  };

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
    <div className="container">
      <div className="md:flex md:gap-8 md:items-start">
        <div className="md:hidden">
          <OutputResult
            outputImage={outputImage}
            processTime={processTime}
            loading={loading}
          />
        </div>
        <div className="bg-white p-3 md:p-6 rounded my-6 md:w-3/5 shadow-md shadow-slate-300">
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
                  previewImage={previewImage[0]}
                  onChange={changePreviewImage}
                  loading={loading}
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
                enablePixelPerfect={enablePixelPerfect}
                handleEnablePixelPerfect={() =>
                  setEnablePixelPerfect(!enablePixelPerfect)
                }
              >
                <ArgumentCard />
                <ControlNetArgForm
                  module={controlNetArgOneObj?.argOneModule}
                  model={controlNetArgOneObj?.argOneModel}
                  setModel={handleControlNetOneChange}
                  setModule={handleControlNetOneChange}
                  weight={controlNetArgOneObj?.argOneWeight}
                  setWeight={handleControlNetOneChange}
                  guidanceStart={controlNetArgOneObj?.argOneGuidanceStart}
                  setGuidanceStart={handleControlNetOneChange}
                  guidanceEnd={controlNetArgOneObj?.argOneGuidanceEnd}
                  setGuidanceEnd={handleControlNetOneChange}
                  addControlnetArg={handleAddControlNetOne}
                  removeControlnetArg={() => handleRemoveControlNetItem(0)}
                  previewImage={previewImage}
                  imageOnChange={changePreviewImage}
                  loading={loading}
                  imageName="argOneImage"
                  moduleName="argOneModule"
                  modelName="argOneModel"
                  weightName="argOneWeight"
                  guidanceStartName="argOneGuidanceStart"
                  guidanceEndName="argOneGuidanceEnd"
                />
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
