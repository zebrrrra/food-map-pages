import { useState, useEffect } from "react";
import { useGlobal } from "@/contexts/globalContext";
import { useRouter } from "next/router";

const useSelectMarkerHook = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isSmallScreen, listRef } = useGlobal();
  const router = useRouter();
  console.log('qq', selectedMarker)

  useEffect(() => {
    console.log(selectedMarker)
    if (!selectedMarker) return
    if (selectedMarker) {
      if (isSmallScreen) {
        const target = listRef.current.querySelector(`#${selectedMarker.id}`);
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/detail/${selectedMarker.name}/${selectedMarker.id}`);
      }
    }
  }, [selectedMarker?.id, selectedMarker?.name]);

  return {
    setSelectedMarker,
    selectedMarker,
  };
};

export default useSelectMarkerHook;
