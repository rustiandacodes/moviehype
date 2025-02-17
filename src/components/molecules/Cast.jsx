import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovieSkeleton from './CardMovieSkeleton';
import { CardArtist } from './CardArtist';
import Skeleton from 'react-loading-skeleton';

const Cast = (props) => {
  const { artist } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, []);
  return (
    <div className={`${artist.length > 0 ? 'block' : 'hidden'} container mx-auto px-5 md:px-0 py-5`}>
      <div className="mb-5">{!isLoading ? <HeaderSection title="Cast" /> : <Skeleton width={300} height={20} />}</div>

      {isLoading && (
        <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
          <CardMovieSkeleton length={8} />
        </div>
      )}

      <Swiper
        className="py-10 flex items-center justify-center"
        modules={[Navigation]}
        breakpoints={{
          350: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1440: {
            slidesPerView: 8,
            spaceBetween: 15,
          },
        }}
        navigation={{
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        style={{ '--swiper-pagination-color': '#FFFF', '--swiper-pagination-bullet-inactive-color': '#999999', '--swiper-navigation-color': '#FFFF' }}
      >
        {artist.length > 0 && artist.map((list, i) => <SwiperSlide key={i}>{!isLoading && <CardArtist key={list.id} name={list.name} image={list.profile_path} character={list.character} />}</SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default Cast;
