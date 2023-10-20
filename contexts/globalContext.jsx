import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const GlobalContext = createContext();

export const GlobalContextComponent = ({ children }) => {
  const mediaQueryList = window.matchMedia("(max-width: 768px)");
  const [isSmallScreen, setIsSmallScreen] = useState(mediaQueryList.matches);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [result, setResult] = useState(null);

  const mapRef = useRef();
  const listRef = useRef();

  const handleResize = useCallback(() => {
    if (mediaQueryList.matches) {
      //  窗口小於768 像素 
      setIsSmallScreen(true);
    } else {
      // 窗口大於768 像素 
      setIsSmallScreen(false);
    }
  }, []);

  useEffect(() => {
    mediaQueryList.addEventListener("change", handleResize);

    return () => {
      mediaQueryList.removeEventListener("change", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentPosition(latLng);
    });
  }, []);
  console.log(isSmallScreen);

  return (
    <GlobalContext.Provider
      value={{
        isSmallScreen,
        currentPosition,
        setCurrentPosition,
        mapRef,
        listRef,
        result,
        setResult,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
