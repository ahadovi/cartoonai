import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
import { ButtonLoaderSpinner } from "./ui/icons";

const App = () => {
  const [hrEnable, setHrEnable] = useState(false);
  const [loadind, setLoading] = useState(false);

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

  //= Respose Image Preview
  const [outputImage, setOutputImage] = useState(
    "https://placehold.co/500x500"
  );

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

  const handleDeleteImage = (imgId) => {
    let newpreviewImages = previewImages.filter((_, i) => imgId !== i);
    setPreviewImages(newpreviewImages);
  };

  //= Submit form json and images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jsonFile);
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

      console.log("response ", response);
      setOutputImage(`${response?.data["Download link"][0]}`);
      setLoading(false);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMessage = `Error: ${error.response.data?.detail}\nStatus code: ${
          error.response.status
        }`;
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
        <div className="bg-white p-3 rounded my-6 shadow-md shadow-slate-300 md:hidden">
          <h3 className="text-xl font-medium mb-3">Output result Image:</h3>
          <img
            src={outputImage}
            alt="response image"
            id="responseImage"
            className="max-w-full h-auto rounded"
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

            <div className="flex items-end gap-x-4">
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
                  className="w-[40px] h-[40px] flex-[0_0_40px] md:w-[48px] md:h-[48px] rounded-md p-1 bg-primary md:flex-[0_0_48px] mb-3 md:mb-4"
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
                      className="bg-navLink rounded-md overflow-hidden relative"
                      key={i}
                    >
                      <img
                        src={previewImage}
                        alt="Upload Preview Image"
                        id="previewImage"
                        className="max-w-full h-auto max-h-[400px]"
                        crossOrigin="anonymous"
                      />
                      <button
                        onClick={() => handleDeleteImage(i)}
                        className="p-2 text-xs rounded bg-red-600 text-white leading-none absolute top-2 right-2"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
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
                  className="px-2.5 py-1.5 md:px-4 md:py-2.5 border-2 border-primary rounded-md w-full"
                />
              </div>
              <div className="w-full md:w-1/2 text-end">
                <button
                  type="submit"
                  disabled={loadind}
                  className="bg-primary w-full mt-5 px-3 py-3 md:mt-0 md:px-5 md:py-3.5 rounded text-white font-medium md:text-xl inline-flex justify-center items-center disabled:bg-primary/[0.75] md:w-[200px]"
                >
                  {loadind ? (
                    <>
                      <ButtonLoaderSpinner /> Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded my-6 md:w-2/5 shadow-md shadow-slate-300 hidden md:block">
          <h3 className="text-xl font-medium mb-3">Output result Image:</h3>
          <img
            src={outputImage}
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
