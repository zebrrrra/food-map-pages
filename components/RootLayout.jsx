import { GlobalContextComponent } from "@/contexts/globalContext";
import { MarkerContextProvider } from "@/contexts/hoverMarkerContext";
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
              <MarkerContextProvider>
                <Map>{children}</Map>
              </MarkerContextProvider>
            </div>
            <SearchBar />
            <LocationButton />
          </GlobalContextComponent>
        </Providers>
      )}
    </>
  );
}
