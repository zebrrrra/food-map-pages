import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import RatingStar from "../RatingStar";
import { dollar } from "@/utils/price";
import { useDispatch } from "react-redux";
import { hoverOver, hoverOut } from "@/store/hoverCardSlice";

const RestaurantCard = ({ id, onCardClick, data }) => {
  const dispatch = useDispatch();

  const handleHover = (value) => {
    dispatch(hoverOver(value));
  };

  const place = data.plus_code.compound_code.split(" ");

  return (
    <li
      className="relative flex flex-col snap-start rounded-xl md:h-[150px] md:max-w-full cursor-pointer md:flex-row md:overflow-hidden md:pr-2 hover:md:bg-[#f4f5f4] md:shadow-md"
      id={id}
      onMouseOver={() => handleHover(id)}
      onMouseOut={() => dispatch(hoverOut())}
      onClick={() => onCardClick({ id, name: data.name })}
    >
      <div className="absolute flex h-[25px] w-[30px] items-center justify-center   bg-white opacity-90 tracking-[1px]">
        <span className="text-gray-900 text-xs">
          {dollar(data.price_level)}
        </span>
      </div>
      <div className="h-[140px] max-w-full  md:flex md:h-full md:w-[80px] lg:w-[140px]">
        {Object.keys(data).includes("photos") ? (
          <Image
            src={data.photos[0].getUrl()}
            alt="site"
            width={200}
            height={200}
            className="h-[inherit] max-h-full rounded-md"
          />
        ) : (
          <div>店家無提供照片</div>
        )}
      </div>
      {/* 圖片以下文字說明 */}
      <div className="md:w-[calc(100%-104px)] mt-1 md:flex-1 md:pl-2 lg:w-[calc(100%-164px)]">
        <div className="flex items-center justify-between md:flex md:grid-cols-3 md:gap-4">
          <h3 className="  overflow-hidden text-ellipsis whitespace-nowrap text-lg md:col-span-2 ">
            {data.name}
          </h3>
        </div>
        {/* 評星 */}
        <div className="mt-1 hidden items-center justify-start md:flex">
          <RatingStar rating={data.rating} />
          <p className="font-medium text-black">{data.rating}</p>
        </div>
        <div className="hidden md:mt-1 md:flex md:w-[180px] md:items-center md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
          <MapPinIcon className="w-5 h-5" />
          <p className="">{data.vicinity}</p>
        </div>
        <div className=" mt-1 flex items-center justify-start">
          <p>
            {data.opening_hours.open_now ? (
              <span className="text-brand-700">營業中</span>
            ) : (
              <span className="text-sunsetOrange">打烊中</span>
            )}{" "}
            · {place[place.length - 1]}
          </p>
        </div>
      </div>
    </li>
  );
};
export default RestaurantCard;
