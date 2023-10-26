import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import OpenLabel from "../OpenLabel";
import ClosedLabel from "../ClosedLabel";
import RatingStar from "../RatingStar";
import { useGlobal } from "@/contexts/globalContext";
import { dollar } from "@/utils/price";
import { useDispatch } from 'react-redux'
import { hoverOver, hoverOut } from "@/store/hoverCardSlice";

const RestaurantCard = ({ id, onCardClick, data }) => {
  const { isSmallScreen } = useGlobal();
  const dispatch = useDispatch()

  const handleHover = (value) => {
    if (!isSmallScreen) {
      dispatch(hoverOver(value))
    }
  };

  const place = data.plus_code.compound_code.match(/[\u4e00-\u9fa5]+/);
  // compound_code:"X6X2+5G 中西區 台南市"
  // place:["中西區","台南市"]
  return (
    <li
      className="flex max-w-[300px] snap-start rounded-xl bg-white px-4 pt-4 shadow-lg md:h-[150px] md:max-w-full md:cursor-pointer md:flex-row md:overflow-hidden md:px-2 md:pb-2 hover:bg-[rgb(235,235,235)]"
      id={id}
      onMouseOver={() => handleHover(id)}
      onMouseOut={() => dispatch(hoverOut())}
      onClick={() => onCardClick({ id, name: data.name })}
    >
      <div className="h-[112px] max-w-full  md:flex md:h-full md:w-[80px] lg:w-[140px]">
        {Object.keys(data).includes("photos") ? (
          <Image
            src={data.photos[0].getUrl()}
            alt="site"
            width={200}
            height={200}
            className="h-[inherit] max-h-full "
          />
        ) : (
          <div>店家無提供照片</div>
        )}
      </div>
      {/* 圖片以下文字說明 */}
      <div className="w-[calc(100%-102px)] pl-4 md:w-[calc(100%-104px)] md:flex-1 md:pl-2 lg:w-[calc(100%-164px)]">
        <div className="flex items-center justify-between md:flex md:grid-cols-3 md:gap-4">
          <h3 className="  overflow-hidden text-ellipsis whitespace-nowrap text-lg md:col-span-2 ">
            {data.name}
          </h3>
          <div className="h-full w-[60px] md:col-span-1">
            {data.opening_hours.open_now ? <OpenLabel /> : <ClosedLabel />}
          </div>
        </div>
        <div className=" mt-1 flex items-center justify-start">
          <RatingStar rating={data.rating} />
          <p className="font-medium text-black">{data.rating}</p>
        </div>
        <div className="hidden md:mt-1 md:flex md:w-[180px] md:items-center md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
          <MapPinIcon className="w-6" />
          <p className="">{data.vicinity}</p>
        </div>
        <div className=" mt-1 flex items-center justify-start">
          <p>
            {dollar(data.price_level)} · {place[0]}
          </p>
        </div>
        <button
          onClick={() => onCardClick(id)}
          className="mt-2 h-10 w-full rounded-md bg-brand-700 text-white md:hidden"
        >
          <span className="text-base">查看詳細資訊</span>
        </button>
      </div>
    </li>
  );
};
export default RestaurantCard;
