import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const Testimonail = () => {
    const axiosSecure = UseAxiosSecure()
    
    const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const {data: reviews} = useQuery({
    queryKey: ['reviews'],
    queryFn: async ()=>{
        const res = await axiosSecure.get('/reviews')
        return res.data;
    }
  })
  console.log(reviews)


    return (
        <div className='w-10/12 mx-auto bg-[#3f8acd] rounded-xl bg-opacity-15 px-10 py-20'>
               <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>

        {
            reviews?.map(item => (
                <SwiperSlide>
                    <div className=' flex flex-col items-center justify-start my-14 gap-2'>
                        <h1 className='text-2xl'>Name: {item?.userName}</h1>
                        <h2>Meal Name: {item?.mealName}</h2>
                        <p>Reviews: {item?.reviewsText}</p>
                    </div>
                </SwiperSlide>
            ))
        }
   
        <div className="autoplay-progress" slot="container-end">
          {/* <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg> */}
          <span ref={progressContent}></span>
        </div>
      </Swiper>
        </div>
    );
};

export default Testimonail;