import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent } from "../../store/slice/apiSlice";
import Link from 'next/link';

export default function Carousel() {
  const dispatch = useDispatch();
  const [randomIndices, setRandomIndices] = useState([]);
  const [topRatedContents, setTopRatedContents] = useState([]);
  const [topReadContents, setTopReadContents] = useState([]);
  
  // Fetch contents when the component mounts
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);
  
  const contents = useSelector((state) => state.api.contents);
  const isLoading = useSelector((state) => state.api.isLoading);
  const error = useSelector((state) => state.api.error);

    // Generate random indices after contents are fetched or updated
    useEffect(() => {
      if (contents.length > 0) {
        setRandomIndices([...Array(10)].map(() => Math.floor(Math.random() * contents.length)));
      }
    }, [contents]);

  // Filter, sort contents based on rating, and take the top 5
  useEffect(() => {
    const topRated = [...contents].sort((a, b) => b?.rating - a.rating).slice(0, 10);
    setTopRatedContents(topRated);
  }, [contents]);
  useEffect(() => {
    const topRated = [...contents].sort((a, b) => b?.review_count - a.review_count).slice(0, 10);
    setTopReadContents(topRated);
  }, [contents]);

  if (isLoading) return <span className="loading loading-bars loading-md"></span>;
  if (error) return error;

  return (
    <section className="w-full bg-base-200 justify-center flex items-center pt-5 flex-col">
      <h1 className='text-3xl p-5 font-bold'>RANDOM</h1>
      <div className="h-[25em] w-full carousel carousel-center shadow-custom1 shadow-[#252525] ">
        {randomIndices.map((index) => (
          <div key={contents[index]?.id} className="carousel-item m-1">
            <Link href={`/Books/${contents[index]?.id}`}>
              <img className='h-full' src={contents[index]?.image_url} alt="" />
            </Link>
          </div>
        ))}
      </div>
      <div className='pt-36 flex w-full justify-between p-10 items-center'>
        <h1 className='font-bold text-3xl'>TOP RATED</h1>
        <hr className='border-secondary border-solid border-1 w-[85%]' />
        <Link href="/Rating" className='btn'>ALL</Link>
      </div>
      <div className="h-[25em] w-full carousel carousel-center shadow-custom1 shadow-[#252525] ">
        {topRatedContents.map((content) => (
          <div key={content.id} className="carousel-item m-1">
            <Link href={`/Books/${content.id}`}>
              <img className='h-full' src={content.image_url} alt="" />
            </Link>
          </div>
        ))}
      </div>
      <div className='pt-36 flex w-full justify-between p-10 items-center'>
        <h1 className='font-bold text-3xl'>TOP REVIEW</h1>
        <hr className='border-secondary border-solid border-1 w-[84%]' />
        <Link href="/Review_" className='btn'>ALL</Link>
      </div>
      <div className="h-[25em] w-full carousel carousel-center shadow-custom1 shadow-[#252525] ">
        {topReadContents.map((content) => (
          <div key={content?.id} className="carousel-item m-1">
            <Link href={`/Books/${content?.id}`}>
              <img className='h-full' src={content?.image_url} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
