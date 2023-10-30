import { Marker } from "@react-google-maps/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useSelectMarkerHook from "@/hooks/selectMarkerHook";

const ResultMarker = ({ data }) => {
  const { setSelectedMarker } = useSelectMarkerHook();
  const [hover, setHover] = useState(false);
  const cardId = useSelector((state) => state.cardId.cardId);
  const router = useRouter();
  let bouncing = router.pathname === "/search/[...slug]" && cardId === data.id;

  return (
    <>
      <Marker
        position={data.location}
        icon={{
          path: "M17.4404 0C9.50063 0 3.04043 6.4602 3.04043 14.391C2.98823 25.992 16.8932 35.6112 17.4404 36C17.4404 36 31.8926 25.992 31.8404 14.4C31.8404 6.4602 25.3802 0 17.4404 0ZM17.4404 21.6C13.4624 21.6 10.2404 18.378 10.2404 14.4C10.2404 10.422 13.4624 7.2 17.4404 7.2C21.4184 7.2 24.6404 10.422 24.6404 14.4C24.6404 18.378 21.4184 21.6 17.4404 21.6Z",
          fillColor: hover || bouncing ? "#0f766e" : "#212232",
          fillOpacity: 1,
          strokeWeight: 1.5,
          strokeColor: "white",
          rotation: 0,
          scale: 1,
          anchor: new google.maps.Point(0, 0),
        }}
        title={data.name}
        animation={bouncing ? google.maps.Animation.BOUNCE : null}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => setSelectedMarker({ name: data.name, id: data.id })}
      />
    </>
  );
};
export default ResultMarker;
