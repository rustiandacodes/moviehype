import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPerson, getPersonCombinedCredit } from '../services/tmdbapi';
import MovieHistories from '../components/oraganisms/MovieHistories';
import { dateConverter } from '../utils/dateConverter';

export const Person = () => {
  const { person_id } = useParams();
  const [detailPerson, setDetailPerson] = useState([]);
  const [character, setCharacter] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + detailPerson.profile_path;

  useEffect(() => {
    getPerson(person_id).then((res) => {
      setDetailPerson(res);
    });
    getPersonCombinedCredit(person_id).then((res) => {
      setCharacter(res.cast);
    });

    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsClamped(scrollHeight > clientHeight);
    }
  }, [detailPerson.biography]);

  console.log(detailPerson);

  return (
    <div className="theme-switch pt-24 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <img className="md:rounded-lg md:w-[280px] md:h-[400px] lg:rounded-2xl" src={baseImgUrl} alt={detailPerson.name} />
            <div className="hidden md:block py-5 px-5 md:px-0 md:w-[280px] md:h-[400px]">
              <h3 className="text-xl font-bold">Personal Info</h3>
              <div className="my-5">
                <h4 className="font-semibold">Known For</h4>
                <p>{detailPerson.known_for_department}</p>
              </div>
              <div className="my-5">
                <h4 className="font-semibold">Gender</h4>
                <p>{detailPerson.gender === 2 ? 'Male' : 'Female'}</p>
              </div>
              <div className="my-5">
                <h4 className="font-semibold">Birthday</h4>
                <p>{dateConverter(detailPerson.birthday)}</p>
              </div>
              <div className="my-5">
                <h4 className="font-semibold">Place Of Birth</h4>
                <p>{detailPerson.place_of_birth}</p>
              </div>
              <div className="my-5">
                <h4 className="font-semibold">Also Known As</h4>
                {detailPerson?.also_known_as?.map((d) => (
                  <p>{d}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="md:pt-5">
            <div className="px-5 md:px-0">
              <h2 className="text-2xl font-bold mb-5">{detailPerson.name}</h2>
              <h3 className="font-bold text-lg mb-3">Biography</h3>
              <p ref={textRef} className={readMore === false ? 'line-clamp-4' : ''}>
                {detailPerson.biography === '' ? '-' : detailPerson.biography}
              </p>
              {isClamped && (
                <span onClick={() => setReadMore(!readMore)} className={` font-semibold text-red-500 cursor-pointer hover:text-red-500/50`}>
                  {readMore === false ? 'Show More' : 'Show Less'}
                </span>
              )}
            </div>

            <div className="md:hidden py-3 px-5 md:px-0 md:w-[280px] md:h-[400px]">
              <h3 className="text-xl font-bold">Personal Info</h3>
              <div className="my-2">
                <h4 className="font-semibold">Known For</h4>
                <p>{detailPerson.known_for_department}</p>
              </div>
              <div className="my-2">
                <h4 className="font-semibold">Gender</h4>
                <p>{detailPerson.gender === 2 ? 'Male' : 'Female'}</p>
              </div>
              <div className="my-2">
                <h4 className="font-semibold">Birthday</h4>
                <p>{dateConverter(detailPerson.birthday)}</p>
              </div>
              <div className="my-2">
                <h4 className="font-semibold">Place Of Birth</h4>
                <p>{detailPerson.place_of_birth}</p>
              </div>
              <div className="my-2">
                <h4 className="font-semibold">Also Known As</h4>
                {detailPerson?.also_known_as?.map((d) => (
                  <p>{d}</p>
                ))}
              </div>
            </div>

            <MovieHistories movies={character} />
          </div>
        </div>
        {/* <KnownFor movies={character} /> */}
      </div>
    </div>
  );
};
