import { useEffect, useState } from 'react';
import { getPopularArtist } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import { CardArtist } from '../molecules/CardArtist';
import Skeleton from 'react-loading-skeleton';
import CardMovieSkeleton from '../molecules/CardMovieSkeleton';

export const PopularArtists = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPopularArtist().then((result) => {
      setArtists(result.slice(0, 16));
          const delayLoading = setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return () => clearTimeout(delayLoading);
    });

  }, []);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      {!isLoading ? <HeaderSection title="Popular Artists" /> : <Skeleton width={300} height={20} />}
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {isLoading && <CardMovieSkeleton length={16} type={'artist'} />}
        {!isLoading && artists.length > 0 && artists.map((artist) => <CardArtist key={artist.id} name={artist.name} image={artist.profile_path} />)}
      </div>
    </div>
  );
};
