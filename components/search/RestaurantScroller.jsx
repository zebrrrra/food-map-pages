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
        className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-end overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
      >
        <ul
          className="grid snap-mandatory list-none auto-cols-[300px] grid-flow-col auto-rows-[160px] gap-x-3 md:h-full md:auto-cols-[18rem] md:grid-flow-row md:auto-rows-[150px]  md:gap-y-3 lg:auto-cols-[470px] "
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
