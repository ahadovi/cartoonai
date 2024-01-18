import { Fragment, useEffect, useState } from "react";
import Controlnet from "./components/Controlnet";
import optionsData from "./constant/optionDatas";

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

  const [controlnelValue, setControlnetValue] = useState({});

  //==Create JSON File
  const [jsonFile, setJsonFile] = useState({});
  const [argArr, setArgArr] = useState([
    {
      module: "module",
      model: "model",
      weight: "weight",
    },
  ]);

  const [controlnetArr, setControlNetArr] = useState([]);

  const handleOnChange = (event, i) => {
    let { name, value } = event.target;
    let obj = {};
    if (name === "weight") {
      value = Number(value);
    }
    obj[`${name}`] = value;
    setControlnetValue({ ...controlnelValue, ...obj });
  };

  console.log(controlnelValue);

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
            args: [controlnelValue],
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
    controlnelValue,
  ]);

  console.log("jsonfile", jsonFile);

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
                    value={controlnelValue}
                    index={i}
                    setValue={(e) => handleOnChange(e, i)}
                  />
                </Fragment>
              ))}
          </form>
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
