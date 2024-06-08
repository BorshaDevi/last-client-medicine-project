// import Swiper from "swiper";
// import { SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';

// import './styles.css';







import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import usePublie from '../../../Hook/usePublie';

const Discount = () => {
    const axiosPublic=usePublie()
    const {data : discount = []}=useQuery({
        queryKey:['discount'],
        queryFn:async()=>{
            const result=await axiosPublic.get('/discount')
            console.log('working',result.data)
            return result.data
        }
    })
    const discountCard=discount.filter(count => count.discount)
    console.log('form discount',discountCard)
    return (
        <div className='mt-10'>
          <h1 className='uppercase text-center text-2xl text-teal-600  font-semibold mb-10'>Discount <span className='text-2xl text-red-500 font-semibold'>%</span> </h1>
          <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
       {
        discountCard.map(card =>  <SwiperSlide key={card._id}><div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure><img src={card.photo} alt="Shoes" className='w-20' /></figure>
          <div className="card-body">
            <h2 className="card-title">{card.itemName}</h2>
            <p className='uppercase font-semibold'>Company Name : <span className='text-teal-700'>{card.companyName}</span></p>
            <div className="card-actions ">
             <p className='text-xl text-red-600 font-bold'>{card.discount}%</p>
            </div>
          </div>
        </div></SwiperSlide>)
       }
        
      </Swiper>
        </div>
    );
};

export default Discount;