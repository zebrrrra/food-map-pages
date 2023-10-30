import React, { useMemo, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGlobal } from "@/contexts/globalContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const markerStyle = {
  path: "M17.4404 0C9.50063 0 3.04043 6.4602 3.04043 14.391C2.98823 25.992 16.8932 35.6112 17.4404 36C17.4404 36 31.8926 25.992 31.8404 14.4C31.8404 6.4602 25.3802 0 17.4404 0ZM17.4404 21.6C13.4624 21.6 10.2404 18.378 10.2404 14.4C10.2404 10.422 13.4624 7.2 17.4404 7.2C21.4184 7.2 24.6404 10.422 24.6404 14.4C24.6404 18.378 21.4184 21.6 17.4404 21.6Z",
  fillColor: "#F9BC60",
  fillOpacity: 1,
  strokeWeight: 1.5,
  strokeColor: "white",
  rotation: 0,
  scale: 1,
  anchor: new google.maps.Point(0, 0),
};

const options = {
  backgroundColor: "#C3CBCD",
  disableDefaultUI: true,
  clickableIcons: false,
  mapId: "82bd6041d8ef1156",
};

const Map = ({ children }) => {
  const { currentPosition, mapRef } = useGlobal();
  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );
  let havePosition = currentPosition.lat !== 0 && currentPosition.lng !== 0;

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const center = useMemo(
    () => ({
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    }),
    [currentPosition.lat, currentPosition.lng],
  );

  return (
    <>
      <div className="fixed inset-0">
        <div className=" absolute left-0 top-0 h-full w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={options}
            onLoad={onLoad}
          >
            {/* 目前位置marker */}
            {havePosition ? (
              <Marker
                position={latLng}
                icon={markerStyle}
                zIndex={2}
                clickable={false}
              />
            ) : null}
            {children}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Map;
