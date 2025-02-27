import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPerson, getPersonCombinedCredit } from '../services/tmdbapi';
import Cast from '../components/molecules/Cast';
import KnownFor from '../components/molecules/KnownFor';
import MovieHistories from '../components/oraganisms/MovieHistories';

export const Person = () => {
  const { person_id } = useParams();
  const [detailPerson, setDetailPerson] = useState([]);
  const [character, setCharacter] = useState([]);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + detailPerson.profile_path;

  useEffect(() => {
    getPerson(person_id).then((res) => {
      setDetailPerson(res);
    });
    getPersonCombinedCredit(person_id).then((res) => {
      setCharacter(res.cast);
    });
  }, []);

  return (
    <div className="theme-switch pt-24 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          <img className="rounded-lg md:w-[300px] md:h-[400px] md:rounded-2xl" src={baseImgUrl} alt={detailPerson.name} />
          <div>
            <h2 className="text-2xl font-bold">{detailPerson.name}</h2>
            <p className="text-lg font-semibold">Biography</p>
            <div className=" relative overflow-hidden">
              <p>{detailPerson.biography}</p>
            </div>
            <MovieHistories movies={character} />
          </div>
        </div>
        {/* <KnownFor movies={character} /> */}
      </div>
    </div>
  );
};
