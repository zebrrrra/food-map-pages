import { Marker } from "@react-google-maps/api";
import { getSearchLatLng } from "@/utils/searchLatLng";
import { useGlobal } from "@/contexts/globalContext";
import { useMarkerContext } from "@/contexts/markerContext";
import useSelectMarkerHook from "@/hooks/selectMarkerHook";

const ResultMarkers = () => {
  const { result } = useGlobal();
  const restaurants = getSearchLatLng(result)
  const { hoveredCardId } = useMarkerContext();
  const { setSelectedMarker, selectedMarker } = useSelectMarkerHook();

  return (
    <>
      {restaurants &&
        restaurants.map((item) => (
          <Marker
            key={item.id}
            position={item.location}
            icon={{
              url: selectedMarker?.id === item.id ? "https://img.icons8.com/tiny-color/32/visit.png" : "https://img.icons8.com/tiny-glyph/32/visit.png",
            }}
            title={item.name}
            animation={
              hoveredCardId === item.id ? google.maps.Animation.BOUNCE : null
            }
            onClick={() => setSelectedMarker({ name: item.name, id: item.id })}
          />
        ))}
    </>
  );
};

export default ResultMarkers;