import Spinner from "../../Components/Spinner";
import useAnnousment from "../../Hooks/useAnnousment";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Annousments = () => {
  const [announcement, isPending] = useAnnousment();
  

  if (isPending) return <Spinner />;

  if (announcement.length === 0) return null;


  return (
    <div className="mt-14">
      <div className="text-center my-10 w-96 mx-auto">
        <p className="text-yellow-600 text-xl">Important </p>
        <p className="text-black text-3xl border-y-2 py-2 mt-2">  Announcement </p>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {announcement.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="" key={item._id}>
              <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border h-72 overflow-y-auto">
                <div className="p-6 flex flex-col justify-between">
                  <div className="flex items-center gap-4 font-bold">
                    <img className="w-14 rounded-full" src={item.image} alt="" />
                    <h1>{item.name} </h1>
                  </div>
                  <div className="">
                    <h5 className="mb-2 font-sans font-semibold text-blue-gray-900">
                      {item.title}
                    </h5>
                  </div>
                  <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit mt-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
    </div>
  );
};

export default Annousments;
