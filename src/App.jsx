import { Fragment, useEffect, useState } from "react";
import diceImage from "./assets/images/seed-button.png";
import Controlnet from "./components/Controlnet";
import ContronetArgCard from "./components/ContronetArgCard";
import EnableHr from "./components/EnableHr";
import NumberInput from "./components/NumberInput";
import SelectInput from "./components/SelectInput";
import TextAreaInput from "./components/TextAreaInput";
import TextInput from "./components/TextInput";
import {
  interfaceTypeData,
  modelNameData,
  vaeNameData,
} from "./constant/optionDatas";

const App = () => {
  const [hrEnable, setHrEnable] = useState(false);

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
  const [module, setModule] = useState("lineart_standard");
  const [model, setModel] = useState("control_v11p_sd15_lineart");
  const [weight, setWeight] = useState(0.75);

  //= Create JSON File
  const [jsonFile, setJsonFile] = useState({});

  //= Controlnet Args Array CURD
  const [controlnetArgArr, setControlnetArgArr] = useState([
    {
      module: module,
      model: model,
      weight: weight,
    },
  ]);

  const handleAddContronetArg = () => {
    setControlnetArgArr((prevArg) => [
      ...prevArg,
      { module: module, model: model, weight: weight },
    ]);
  };

  const handleDeleteContronetArg = (cardId) => {
    let newControlnetArgArr = controlnetArgArr.filter((_, i) => cardId !== i);
    setControlnetArgArr(newControlnetArgArr);
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
        alwayson_scripts: {
          controlnet: {
            args: controlnetArgArr,
          },
        },
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
  ]);

  //== Image Preview
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImage, setUploadImage] = useState("");
  const changePreviewImage = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setPreviewImages(images);
    setUploadImage(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="flex gap-8 items-start">
        <div className="bg-white p-6 rounded my-6 w-3/5 shadow-md shadow-slate-300">
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

            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  name="vae_name"
                  label="Vae Name"
                  optiondata={vaeNameData}
                  value={vaeName}
                  onChange={(e) => setVaeName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  label="Prompt"
                  name="prompt"
                  placeholder="Enter prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            <TextAreaInput
              label="Negative Prompt"
              name="negative_prompt"
              placeholder="Enter negative prompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />

            <div className="flex items-center gap-x-4">
              <div className="w-1/2 flex items-end gap-x-2">
                <NumberInput
                  label="Seed"
                  placeholder="Enter seed"
                  name="seed"
                  value={Number(seed)}
                  onChange={(e) => setSeed(Number(e.target.value))}
                />
                <button
                  id="seedBtn"
                  type="button"
                  className="w-[48px] h-[48px] rounded-md p-1 bg-primary flex-[0_0_48px] mb-4"
                  onClick={() => setSeed(-1)}
                >
                  <img src={diceImage} alt="Seed button" />
                </button>
              </div>
              <div className="w-1/2">
                <NumberInput
                  label="Steps"
                  placeholder="Enter Steps"
                  name="steps"
                  value={Number(steps)}
                  onChange={(e) => setSteps(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <NumberInput
                  label="CFG Scale"
                  placeholder="Enter cfg scale"
                  name="cfg_scale"
                  value={Number(cfgScale)}
                  onChange={(e) => setCfgScale(Number(e.target.value))}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  label="Sampler Name"
                  name="sampler_name"
                  placeholder="Enter Sampler Name"
                  value={samplerName}
                  onChange={(e) => setSamplerName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end gap-x-4">
              <div className="w-1/2">
                <NumberInput
                  label="Denoising Strength"
                  placeholder="Enter Denoising Strength"
                  name="denoising_strength"
                  value={Number(denoisingStrength)}
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
              <h4 className="text-xl font-medium">Contronet Argument List:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {controlnetArgArr &&
                  controlnetArgArr?.map((item, i) => (
                    <Fragment key={i}>
                      <ContronetArgCard
                        moduleName={item?.module}
                        modelName={item?.model}
                        weight={item?.weight}
                        deleteControlnetArg={() => handleDeleteContronetArg(i)}
                      />
                    </Fragment>
                  ))}
              </div>

              <Controlnet
                module={module}
                setModule={(e) => setModule(e.target.value)}
                model={model}
                setModel={(e) => setModel(e.target.value)}
                weight={weight}
                setWeight={(e) => setWeight(e.target.value)}
                addControlnet={handleAddContronetArg}
              />
            </div>

            <div className="mt-5">
              <div className="mb-6 grid grid-cols-3 gap-4">
                {previewImages &&
                  previewImages?.map((previewImage, i) => (
                    <div
                      className="bg-navLink rounded-md overflow-hidden"
                      key={i}
                    >
                      <img
                        src={previewImage}
                        alt="Upload Preview Image"
                        id="previewImage"
                        className="max-w-full h-auto max-h-[400px]"
                        crossOrigin="anonymous"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="md:flex md:items-end md:gap-x-4">
              <div className="md:w-1/2">
                <label
                  htmlFor="images"
                  className="block font-medium mb-2 text-xl"
                >
                  Select Image / Images
                </label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  multiple
                  id="images"
                  name="images"
                  onChange={changePreviewImage}
                  className="px-4 py-2.5 border-2 border-primary rounded-md w-full"
                />
              </div>
              <div className="w-full md:w-1/2 text-end">
                <button
                  type="submit"
                  className="bg-primary w-full mt-3 md:mt-0 px-5 py-3.5 rounded text-white font-medium text-xl disabled:bg-slate-600 md:w-[200px]"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded my-6 w-2/5 shadow-md shadow-slate-300">
          <img
            src="https://placehold.co/500x500"
            alt="response image"
            id="responseImage"
            className="max-w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
