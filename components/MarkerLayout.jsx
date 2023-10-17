import ResultMarkers from "./ResultMarkers";

export default function MarkerLayout({ children }) {
  return (
    <>
      <ResultMarkers />
      {children}
    </>
  );
}
