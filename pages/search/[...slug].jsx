import RestaurantScroller from "@/components/search/RestaurantScroller";
import { useQuery } from "@tanstack/react-query";
import { nearbySearch } from "@/api/nearbySearch";
import { useGlobal } from "@/contexts/globalContext";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import MarkerLayout from "@/components/MarkerLayout";
import RootLayout from "@/components/RootLayout";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { currentPosition, mapRef, setResult } = useGlobal();

  const { data, isLoading, isSuccess, error, isError } = useQuery({
    queryKey: ["search", { keyword: slug[0], options: slug[2] }],
    queryFn: ({ queryKey }) =>
      nearbySearch({
        map: mapRef.current,
        keyword: queryKey[1].keyword,
        options: JSON.parse(slug[2].split("=")[1]),
        location: new google.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // 在資料回來之前已經執行過一次
  useEffect(() => {
    if (isSuccess) {
      mapRef.current.panTo(
        new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
      );
      mapRef.current.setZoom(13);
      setResult(data);
    }
    if (isError) {
      alert(`因為${error}，請重新搜尋`);
    }
  }, [slug[0], slug[1], slug[2], isSuccess, isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <RestaurantScroller data={data} />
    </>
  );
};

SearchPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <MarkerLayout>{page}</MarkerLayout>
    </RootLayout>
  );
};

export default SearchPage;
