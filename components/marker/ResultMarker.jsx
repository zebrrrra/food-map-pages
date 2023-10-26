import { Marker } from "@react-google-maps/api";
import { useState } from "react";
import { useSelector } from 'react-redux'
import { useRouter } from "next/router";
import useSelectMarkerHook from "@/hooks/selectMarkerHook";

const ResultMarker = ({ data }) => {
  const { setSelectedMarker } = useSelectMarkerHook();
  const [hover, setHover] = useState(false)
  const cardId = useSelector((state) => state.cardId.cardId)
  const router = useRouter();
  let bouncing = router.pathname === '/search/[...slug]' && cardId === data.id

  return (
    <>
      <Marker
        position={data.location}
        icon={{
          path: "M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307C198.98,120.938,175.559,144.358,146.667,144.358z",
          fillColor: hover ? "rgb(21 128 61)" : "black",
          fillOpacity: 1,
          strokeWeight: 1.5,
          strokeColor: "white",
          rotation: 0,
          scale: 0.15,
          anchor: new google.maps.Point(0, 0),
        }}
        title={data.name}
        animation={
          bouncing ? google.maps.Animation.BOUNCE : null
        }
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => setSelectedMarker({ name: data.name, id: data.id })}
      />
    </>
  );
}
export default ResultMarker