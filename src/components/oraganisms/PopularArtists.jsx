import { useEffect, useState } from 'react';
import { getPopularArtist } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import { CardArtist } from '../molecules/CardArtist';

export const PopularArtists = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    getPopularArtist().then((result) => {
      setArtists(result.slice(0, 16));
    });
  }, []);

  console.log(artists);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      <HeaderSection title="Popular Artists" />
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">{artists.length > 0 && artists.map((artist) => <CardArtist key={artist.id} name={artist.name} image={artist.profile_path} />)}</div>
    </div>
  );
};
