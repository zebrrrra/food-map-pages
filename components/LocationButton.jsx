import Image from "next/image";
import location from "@/public/my-location.svg"
import { useGlobal } from "@/contexts/globalContext";
import { useRouter } from "next/router";

const LocationButton = () => {
  const { mapRef, setCurrentPosition, isSmallScreen } = useGlobal();
  const router = useRouter();
  let up = router.pathname === '/search/[...slug]' && isSmallScreen
  const handlePanToLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition((prev) => ({
        ...prev,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }));

      mapRef.current.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        ),
      );
    });
  };
  return (
    <div
      className={`fixed right-4  flex h-10 w-10 items-center rounded bg-white drop-shadow-md hover:bg-[#F4F5F4] ${up ? "bottom-56" : "bottom-8"}`}
      onClick={handlePanToLocation}
    >
      <Image
        src={location}
        alt="worldwide location"
        width={30}
        height={30}
        className="mx-auto cursor-pointer"
      />
    </div>
  );
};

export default LocationButton;
