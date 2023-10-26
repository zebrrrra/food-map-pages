import { ResultMarkers } from "./marker/ResultMarkers";

export default function MarkerLayout({ children }) {
  return (
    <>
      <ResultMarkers />
      {children}
    </>
  );
}
