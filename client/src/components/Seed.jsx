import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import { useState } from "react";
import diceImage from "../assets/images/seed-button.png";
import NumberInput from "./NumberInput";

const Seed = (props) => {
  const { seed, setSeed, seedNegativeBtn } = props;
  const [saveSeedArr, setSaveSeedArr] = useState([]);
  const handleSaveSeed = () => {
    setSaveSeedArr((prevSeed) => [...prevSeed, seed]);
  };

  const createAndDownloadSeedFile = () => {
    const content = saveSeedArr.join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "save-seed-list.txt");
  };

  return (
    <div className="flex items-end gap-x-2 md:gap-x-3 w-full">
      <NumberInput
        label="Seed"
        placeholder="Enter seed"
        name="seed"
        value={seed}
        onChange={setSeed}
      />
      <button
        id="seedBtn"
        type="button"
        className="w-[40px] h-[40px] flex-[0_0_40px] md:w-[48px] md:h-[48px] rounded-md p-1 bg-primary md:flex-[0_0_48px] mb-3 md:mb-4"
        onClick={seedNegativeBtn}
      >
        <img src={diceImage} alt="Seed button" />
      </button>
      <button
        id="seedBtn"
        type="button"
        className="w-auto h-[40px] flex-[0_0_auto] text-white text-base md:text-2xl md:w-auto md:h-[48px] rounded-md px-2.5 md:px-4 py-1 bg-primary md:flex-[0_0_auto] mb-3 md:mb-4"
        onClick={handleSaveSeed}
      >
        Save Seed ({saveSeedArr?.length})
      </button>
      <button
        id="seedBtn"
        type="button"
        className="w-[40px] h-[40px] flex-[0_0_40px] text-white text-xl md:text-2xl md:w-[48px] md:h-[48px] rounded-md p-1 bg-primary md:flex-[0_0_48px] mb-3 md:mb-4"
        onClick={createAndDownloadSeedFile}
      >
        <FontAwesomeIcon icon={faCloudDownload} />
      </button>
    </div>
  );
};

export default Seed;
