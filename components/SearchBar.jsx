import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import FilterModal from "./FilterModal";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useGlobal } from "@/contexts/globalContext";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [options, setOptions] = useState({});
  const { currentPosition } = useGlobal();
  const router = useRouter();
  const northEast = new google.maps.LatLng(
    currentPosition.lat + 0.05,
    currentPosition.lng + 0.05,
  );
  const southWest = new google.maps.LatLng(
    currentPosition.lat - 0.05,
    currentPosition.lng - 0.05,
  );
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      region: "TW",
      language: "zh-TW",
      locationRestriction: new google.maps.LatLngBounds(southWest, northEast),
      type: ["restaurant"],
    },
    debounce: 1000,
  });
  const onSearchNavigate = (e) => {
    e.preventDefault();
    if (!currentPosition) return alert("請提供位置");
    if (!value.trim()) return alert("請輸入文字");
    clearSuggestions();
    const encodeOptions = encodeURIComponent(JSON.stringify(options));

    router.push(
      `/search/${value}/@${currentPosition.lat},${currentPosition.lng}/options=${encodeOptions}`,
    );
  };

  return (
    <>
      <FilterModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onConfirm={(selectedData) => setOptions(selectedData)}
      />
      <div
        className={`fixed left-0 top-0 w-full py-5 pr-[84px] pl-7 ${router.pathname !== '/' && "md:p-[unset] md:pt-[9.75px] md:w-72 md:h-[10vh] md:bg-white md:border-b-[thick] md:border-b-yellow md:border-solid md:pl-3"} md:translate-x-[unset] lg:w-[470px]`}
      >
        <Combobox value={value} onChange={setValue}>
          {({ open }) => (
            <div className="relative h-10 max-w-[640px]">
              {/* filter鈕 */}
              <button
                onClick={() => setOpenFilter(true)}
                className={`absolute top-0 right-0 translate-x-[130%] flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 drop-shadow-xl ${router.pathname !== '/' && "md:filter-none md:translate-x-[-12px] md:border-solid md:border-[1px] md:border-brand-700"}`}
              >
                <AdjustmentsHorizontalIcon className={`text-brand-700 ${router.pathname !== '/' && "md:stroke-[1.7]"}`} />
              </button>
              <form
                className={`relative w-full h-full rounded-2xl ${open && "rounded-b-[unset]"} cursor-default overflow-hidden bg-white text-left drop-shadow-xl ${router.pathname !== '/' && "md:filter-none md:w-[calc(100%-66.5px)] md:border-solid md:border-[1px] md:border-brand-700"} sm:text-sm`}
                onSubmit={onSearchNavigate}
              >
                <Combobox.Input
                  className="w-full h-full py-2 pl-[25px] pr-10 text-sm leading-5 text-gray-900 md:text-[16px] outline-none"
                  disabled={!ready}
                  placeholder="搜尋餐廳.."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {/* 搜尋鈕 */}
                <Combobox.Button
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                  onClick={onSearchNavigate}
                >
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-brand-700"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </form>
              {data.length !== 0 && (
                <Combobox.Options className="absolute  max-h-60 w-full overflow-auto  bg-white py-1 rounded-b-2xl text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                  {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <Combobox.Option
                        key={place_id}
                        className={({ active }) =>
                          `relative cursor-default select-none pl-5 flex py-3 ${active ? "bg-brand-700 text-white" : "text-gray-500"
                          }`
                        }
                        value={description}
                      >
                        {({ selected }) => (
                          <>
                            <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="18.2902" cy="13.6452" r="8.41936" fill="white" />
                              <path d="M17.4404 0C9.50063 0 3.04043 6.4602 3.04043 14.391C2.98823 25.992 16.8932 35.6112 17.4404 36C17.4404 36 31.8926 25.992 31.8404 14.4C31.8404 6.4602 25.3802 0 17.4404 0ZM17.4404 21.6C13.4624 21.6 10.2404 18.378 10.2404 14.4C10.2404 10.422 13.4624 7.2 17.4404 7.2C21.4184 7.2 24.6404 10.422 24.6404 14.4C24.6404 18.378 21.4184 21.6 17.4404 21.6Z" fill="#737B7D" />
                            </svg>
                            <span
                              className={`block truncate ml-1 ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {description}
                            </span>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              )}
            </div>
          )}
        </Combobox>
      </div>
    </>
  );
};

export default SearchBar;
