import React from "react";
import { Menu } from "@headlessui/react";
import Carousel from "../Carousel";
import RatingStar from "../RatingStar";
import ReviewCard from "../ReviewCard";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  TruckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { getDay } from "@/utils/day";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const Detail = ({ onClose, data }) => {
  const today = getDay({
    index: new Date().getDay(),
    array: data.detail.data.opening_hours.weekday_text,
  });

  return (
    <div
      className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
    >
      <div className={`relative z-50 hidden md:block md:h-full md:w-full`}>
        {/* scrollable container */}
        <div className="fixed inset-0 h-[80vh] overflow-y-auto md:absolute md:right-[unset] md:h-full md:w-full">
          {/* to center container */}
          <div className=" flex min-h-full items-end justify-center md:items-start">
            {/* used to dialog panel */}
            <div
              as="div"
              className="mx-auto max-w-sm rounded bg-white px-4 md:w-full md:max-w-[unset]"
            >
              <div className="my-4 flex h-6 justify-start" onClick={onClose}>
                <div className="flex gap-2 cursor-pointer ">
                  <ChevronLeftIcon className=" w-6 h-6" />
                  <span className="text-base">搜尋清單</span>
                </div>
              </div>
              <Carousel photos={data.detail.photos} />

              {/* 輪播圖以下詳細說明 */}
              <div className="mt-4 flex justify-between">
                <h3 className="text-2xl">{data.detail.data.name}</h3>
                <div>
                  <div className="mb-px flex items-center ">
                    <TruckIcon className="h-5 w-6 text-gray-600 opacity-80" />
                    <span>{data.distance.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-6 text-gray-600 opacity-80" />
                    <span>{data.distance.distance}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <RatingStar rating={data.detail.data.rating} />
                <span>{data.detail.data.rating}</span>
              </div>
              <div className="divide-y">
                <div className="flex py-4">
                  <MapPinIcon className="mr-4 h-6 w-6 text-gray-600 opacity-80" />
                  <h4 className="text-base">
                    {data.detail.data.formatted_address}
                  </h4>
                </div>
                <div className="flex py-4">
                  <PhoneIcon className="mr-4 h-6 w-6 text-gray-600 opacity-80" />
                  <h4 className="text-base">
                    {data.detail.data.formatted_phone_number}
                  </h4>
                </div>
                <Menu as="div" className="flex items-center py-4">
                  {({ open }) => (
                    <>
                      <ClockIcon className="mr-4 h-6 w-6 text-gray-600 opacity-80" />
                      <div className={`flex ${open && "flex-col"}`}>
                        <div className="flex flex-col">
                          <div className="mb-1 text-base font-medium">
                            營業時間
                          </div>
                          {!open ? (
                            <div className="text-base">{today}</div>
                          ) : null}
                        </div>
                        <div className="flex flex-row-reverse">
                          <Menu.Button
                            className={`ml-1 rounded-full border border-solid  w-6 h-6 hover:border-brand-700 hover:border-[3px] ${
                              open ? "self-start" : "self-end"
                            }`}
                          >
                            <ChevronDownIcon />
                          </Menu.Button>
                          <Menu.Items className="">
                            <Menu.Item>
                              {
                                <>
                                  {data.detail.data.opening_hours.weekday_text.map(
                                    (text, index) => (
                                      <div key={index}>{text}</div>
                                    ),
                                  )}
                                </>
                              }
                            </Menu.Item>
                          </Menu.Items>
                        </div>
                      </div>
                    </>
                  )}
                </Menu>
              </div>
              {/* 評論區 */}
              <h4 className="text-2xl">評論</h4>
              <ol className="mt-6 divide-y">
                {data.detail.data.reviews.map((item, index) => (
                  <ReviewCard key={index} data={item} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
