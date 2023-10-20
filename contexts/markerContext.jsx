import { createContext, useContext, useState, useEffect } from "react";

const MarkerContext = createContext();

export const useMarkerContext = () => {
  return useContext(MarkerContext);
};

export const MarkerContextProvider = ({ children }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    let bounceTimeout;
    if (hoveredCardId) {
      bounceTimeout = setTimeout(() => {
        setHoveredCardId(null);
      }, 2000);
    }
    return () => {
      clearTimeout(bounceTimeout);
    };
  }, [hoveredCardId]);
  return (
    <MarkerContext.Provider value={{ hoveredCardId, setHoveredCardId }}>
      {children}
    </MarkerContext.Provider>
  );
};
