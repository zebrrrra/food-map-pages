export const getSearchLatLng = (data) => {
  if (!data) return;
  console.log(data);
  const latLngArr = data.map(({ geometry, place_id, name }) => ({
    location: new google.maps.LatLng(
      geometry.location.lat(),
      geometry.location.lng(),
    ),
    id: place_id,
    name,
  }));

  return latLngArr;
};
