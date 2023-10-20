import React, { useState } from "react";
import Detail from "@/components/detail/Detail";
import DetailModal from "@/components/detail/DetailModal";
import { useGlobal } from "@/contexts/globalContext";
import { useRouter } from "next/router";
import MarkerLayout from "@/components/MarkerLayout";
import { getDetailData } from "@/api/placeDetail";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import RootLayout from "@/components/RootLayout";

const DetailPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const { isSmallScreen, mapRef, currentPosition } = useGlobal();
  const router = useRouter();
  const { slug } = router.query;

  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getDetail", { id: slug[slug.length - 1] }],
    queryFn: ({ queryKey }) =>
      getDetailData({
        id: queryKey[1].id,
        map: mapRef.current,
        location: latLng,
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleClose = () => {
    if (isSmallScreen) {
      setIsOpenModal(false);
    }
    router.back();
  };

  return (
    <>
      {data && (
        <>
          {isSmallScreen ? (
            <>
              <DetailModal
                data={data}
                isOpen={isOpenModal}
                onClose={handleClose}
              />
            </>
          ) : (
            <Detail data={data} onClose={handleClose} />
          )}
        </>
      )}
    </>
  );
};

DetailPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <MarkerLayout>{page}</MarkerLayout>
    </RootLayout>
  );
};

export default DetailPage;
