import { GlobalContextComponent } from "@/contexts/globalContext";
import Providers from "./Providers";
import SearchBar from "./SearchBar";
import Map from "./Map";
import LocationButton from "./LocationButton";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places", "routes"];

export default function RootLayout({ children }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: "TW",
    language: "zh-TW",
  });
  return (
    <>
      {isLoaded && (
        <Providers>
          <GlobalContextComponent>
            <div className="relative h-screen w-full">
              <Map>{children}</Map>
            </div>
            <SearchBar />
            <LocationButton />
          </GlobalContextComponent>
        </Providers>
      )}
    </>
  );
}
