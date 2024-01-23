import { createContext, useContext, useState } from "react";
export const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [controlNetArgArr, setControlNetArgArr] = useState([]);
  const [enableControlNet, setEnableControlNet] = useState(false);
  const [imagesArr, setImagesArr] = useState({
    img2mg: "",
    controlnet_1: "",
    controlnet_2: "",
    controlnet_3: "",
  });

  const values = {
    controlNetArgArr,
    setControlNetArgArr,
    imagesArr,
    setImagesArr,
    enableControlNet,
    setEnableControlNet,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
