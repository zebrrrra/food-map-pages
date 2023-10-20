import { Marker } from "@react-google-maps/api";
import { getSearchLatLng } from "@/utils/searchLatLng";

import { useGlobal } from "@/contexts/globalContext";
import { useMarkerContext } from "@/contexts/hoverMarkerContext";
import useSelectMarkerHook from "@/hooks/selectMarkerHook";
import { useState, useMemo } from "react";

const ResultMarkers = () => {
  const { result } = useGlobal();
  const restaurants = getSearchLatLng(result);
  const { hoveredMarkerId } = useMarkerContext();
  const { setSelectedMarker } = useSelectMarkerHook();
  const [hover, setHover] = useState('')

  // console.log(result);
  return (
    <>
      {restaurants &&
        restaurants.map((item) => (
          <Marker
            key={item.id}
            position={item.location}
            icon={{
              url: hover === item.id ? "https://img.icons8.com/tiny-color/32/visit.png" : "https://img.icons8.com/tiny-glyph/32/visit.png",
            }}
            title={item.name}
            animation={
              hoveredMarkerId === item.id ? google.maps.Animation.BOUNCE : null
            }
            onMouseOver={() => setHover(item.id)}
            onMouseOut={() => setHover(null)}
            onClick={() => setSelectedMarker({ name: item.name, id: item.id })}
          />
        ))}
    </>
  );
};

export default ResultMarkers;