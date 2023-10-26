import { getSearchLatLng } from "@/utils/searchLatLng";
import { useGlobal } from "@/contexts/globalContext";
import ResultMarker from "./ResultMarker";

export const ResultMarkers = () => {
  const { result } = useGlobal();
  const restaurants = getSearchLatLng(result)

  return (
    restaurants && restaurants.map((item) => (<ResultMarker key={item.id} data={item} />))
  )
}



