"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent } from '@/store/slice/apiSlice';
import Link from 'next/link';

function Page() {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.api.contents);  
  const isLoading = useSelector((state) => state.api.isLoading);
  const error = useSelector((state) => state.api.error);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  // Update filteredData when contents or search changes
  useEffect(() => {
    const filtered = contents.filter(content =>
      content.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, contents]);

  if (isLoading) {
    return <span className="loading loading-bars loading-md"></span>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <section className='bg-base-300'>
      <Navbar />
      <section className='p-4 flex flex-wrap'>
        <label className="input input-bordered flex items-center gap-2 w-[50%]">
          <input type="text" className="grow" placeholder="Search Title ..." onChange={(e) => setSearch(e.target.value)} />
          {/* Search icon here */}
        </label>

        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 p-4'>
          {filteredData.map((content) => (
            <div className='m-5  flex flex-col  ' key={content.id}> {/* Ensure unique key */}
              <Link href={`/Books/${content.id}`}>
                <img
                  className='w-full h-[280px] rounded hover:scale-[1.02] transition-[2s]'
                  src={content.image_url}
                  alt={content.title} // Adding alt attribute for accessibility
                />
                <h1 className='font-bold  text-center'>{content.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </section>``
    </section>
  );
}

export default Page;
