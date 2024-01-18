import { Fragment, useEffect, useState } from "react";
import diceImage from "./assets/images/seed-button.png";
import Controlnet from "./components/Controlnet";
import NumberInput from "./components/NumberInput";
import SelectInput from "./components/SelectInput";
import TextAreaInput from "./components/TextAreaInput";
import TextInput from "./components/TextInput";
import optionsData from "./constant/optionDatas";
import cn from "./utils/index";

const App = () => {
  const [hrEnable, setHrEnable] = useState(true);

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

  //==Create JSON File
  const [jsonFile, setJsonFile] = useState({});
  const [argArr, setArgArr] = useState([
    {
      module: module,
      model: model,
      weight: weight,
    },
  ]);

  const pushArgArr = () => {
    setArgArr((prev) => [
      ...prev,
      { module: "ovi", model: "hasib", weight: 0.85 },
    ]);
  };

  const [demoArr, setDemoArr] = useState([]);
  const handleArr = () => {
    setDemoArr((prev) => [...prev, `a`]);
  };

  console.log(demoArr);

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
            args: argArr,
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
    argArr,
  ]);

  //== Image Preview
  const [previewImage, setPreviewImage] = useState(
    "https://placehold.co/400x400"
  );
  const [uploadImage, setUploadImage] = useState("");
  const changePreviewImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUploadImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="flex gap-8 items-start">
        <div className="bg-white p-6 rounded my-6 w-3/5">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-4">
              <div className="w-1/2">
                <SelectInput
                  name="inference_type"
                  label="Interface Type"
                  value={inferenceType}
                  onChange={(e) => setInferenceType(e.target.value)}
                  optionData={optionsData[0].interfaceType}
                />
              </div>
              <div className="w-1/2">
                <SelectInput
                  name="model_name"
                  label="Model Name"
                  optionData={optionsData[1].modelName}
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
                  optionData={optionsData[2].vaeName}
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
              <div className="w-1/2">
                <button
                  type="button"
                  className={cn(
                    "bg-primary px-4 py-3 mb-4 text-white rounded-md w-full font-medium",
                    hrEnable ? "bg-green-700" : "bg-primary"
                  )}
                  onClick={() => setHrEnable(!hrEnable)}
                >
                  Enable Hr ?
                </button>
              </div>
            </div>

            <div
              className={cn(
                "border-2 border-green-800 rounded-md p-4 pb-0 transition-all duration-300",
                hrEnable ? "opacity-1 visible" : "opacity-0 invisible"
              )}
            >
              <div className="flex items-center gap-x-4">
                <div className="w-1/2">
                  <NumberInput
                    label="Hr Scale"
                    placeholder="Enter Hr Scale"
                    name="hr_scale"
                    value={Number(hrScale)}
                    onChange={(e) => setHrScale(Number(e.target.value))}
                  />
                </div>
                <div className="w-1/2">
                  <NumberInput
                    label="Hr Second Pass Steps"
                    placeholder="Enter Hr Second Pass Steps"
                    name="hr_second_pass_steps"
                    value={Number(hrSecondPassSteps)}
                    onChange={(e) =>
                      setHrSecondPassSteps(Number(e.target.value))
                    }
                  />
                </div>
              </div>
              <TextInput
                label="Hr Upscaler"
                name="hr_upscaler"
                placeholder="Enter Hr Upscaler"
                value={hrUpscaler}
                onChange={(e) => setHrUpscaler(e.target.value)}
              />
            </div>

            <div className="my-6 ">
              <h4 className="text-xl font-bold">Contronet:</h4>
              <button
                onClick={handleArr}
                className="bg-primary text-white font-medium rounded px-4 py-3 mt-4"
              >
                Add Controlnet
              </button>
            </div>

            {demoArr &&
              demoArr.map((item, i) => (
                <Fragment key={i}>
                  <Controlnet
                    moduleOptionData={optionsData[3].module}
                    modelOptionData={optionsData[4].model}
                    module={module}
                    setModule={(e) => setModule(e.target.value)}
                    model={model}
                    setModel={(e) => setModel(e.target.value)}
                    weight={weight}
                    setWeight={(e) => setWeight(e.target.value)}
                  />
                </Fragment>
              ))}

            <div className="mt-5">
              <div className="mb-6 md:w-1/2">
                <img
                  src={previewImage}
                  alt="Upload Preview Image"
                  id="previewImage"
                  className="max-w-full h-auto max-h-[400px]"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="mb-3 md:w-1/2">
                <label
                  htmlFor="images"
                  className="block font-medium mb-2 text-xl"
                >
                  Select Image
                </label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  id="images"
                  name="images"
                  onChange={changePreviewImage}
                  className="px-4 py-2.5 border-2 border-primary rounded-md w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              id="submitBtn"
              className="bg-primary px-5 py-3 rounded text-white font-medium text-xl disabled:bg-slate-600"
            >
              Submit
            </button>
          </form>

          <button onClick={pushArgArr}>push</button>
        </div>
        <div className="bg-white p-6 rounded my-6 w-2/5">
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
