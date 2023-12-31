import React from "react";
import { getDay } from "@/utils/day";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";

import Carousel from "../Carousel";
import RatingStar from "../RatingStar";
import ReviewCard from "../ReviewCard";

const DetailModal = ({ isOpen, onClose, data }) => {
  const today = getDay({
    index: new Date().getDay(),
    array: data.detail.data.opening_hours.weekday_text,
  });
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50 md:h-full md:w-full">
        {/* overlay */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 md:hidden"
            aria-hidden="true"
          />
        </Transition.Child>
        {/* modal內容 */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in duration-200 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          {/* scroll container */}
          <div className="fixed  inset-x-0 bottom-0 h-[80vh] overflow-y-auto md:absolute md:right-[unset] md:top-0 md:h-full md:w-full">
            {/*  center container */}
            <div className=" flex min-h-full items-end justify-center md:items-start">
              {/* 與detail有異 但保持原樣 */}
              <Dialog.Panel className="w-full rounded bg-white px-4 ">
                <button
                  className="flex h-6 w-full justify-center md:invisible"
                  onClick={onClose}
                >
                  <ChevronDownIcon className="w-6" />
                </button>
                <Carousel photos={data.detail.photos} />

                {/* 輪播圖以下詳細說明 */}
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-xl">{data.detail.data.name}</h3>
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
                <div className="mt-1 flex items-center">
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
                <h4 className="mt-4 text-2xl">評論</h4>
                <ol className="mt-4 divide-y">
                  {data.detail.data.reviews.map((item, index) => (
                    <ReviewCard key={index} data={item} />
                  ))}
                </ol>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DetailModal;
