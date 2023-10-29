import RestaurantCard from "./RestaurantCard";
import { useRouter } from "next/router";
import { useGlobal } from "@/contexts/globalContext";

const RestaurantScroller = ({ data }) => {
  const router = useRouter();
  const { listRef } = useGlobal();

  const handleCardClick = (value) => {
    if (typeof value === "object") {
      router.push(`/detail/${value.name}/${value.id}`);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 flex pt-3 px-3 w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll bg-white lg:w-[470px]`}
      >
        <ul
          className="grid snap-mandatory list-none auto-cols-[154px] grid-flow-col auto-rows-[210px] gap-x-3 md:h-full md:auto-cols-[1fr] md:grid-flow-row md:auto-rows-[150px]  md:gap-y-3"
          ref={listRef}
        >
          {data &&
            data.map((item) => (
              <RestaurantCard
                id={item.place_id}
                key={item.place_id}
                data={item}
                onCardClick={(value) => handleCardClick(value)}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default RestaurantScroller;
