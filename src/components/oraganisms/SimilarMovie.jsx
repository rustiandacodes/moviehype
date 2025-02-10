import React, { useEffect, useState } from 'react';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovie from '../molecules/CardMovie';
import Skeleton from 'react-loading-skeleton';
import CardMovieSkeleton from '../molecules/CardMovieSkeleton';

export const SimilarMovie = (props) => {
  const { movie } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, []);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      {!isLoading ? <HeaderSection title="Recomendations" /> : <Skeleton width={300} height={20} />}
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {isLoading && <CardMovieSkeleton length={16} />}
        {!isLoading && movie.length > 0 && movie.map((item, i) => <CardMovie key={i} title={item.title} poster={item.poster_path} rating={item.vote_average} genre={item.genre_ids} date={item.release_date} id={item.id} />)}
      </div>
    </div>
  );
};
