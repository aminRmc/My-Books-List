// Utilizes the client-side execution model.
"use client";

// Import necessary hooks and components from React, Redux, and Next.js libraries.
import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar'; // Custom navigation bar component.
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks for state selection and dispatching actions.
import { fetchContent } from '@/store/slice/apiSlice'; // Action creator for fetching content.
import Link from 'next/link'; // Next.js Link component for client-side navigation.

// The main functional component for the page.
function Page() {
  const dispatch = useDispatch(); // Hook to dispatch actions.
  const contents = useSelector((state) => state.api.contents); // Selects contents from Redux state.
  const isLoading = useSelector((state) => state.api.isLoading); // Selects loading state.
  const error = useSelector((state) => state.api.error); // Selects error state if any during fetching contents.
  
  // State for handling search/filter input.
  const [search, setSearch] = useState('');
  // State for filtered data based on search.
  const [filteredData, setFilteredData] = useState([]);
  // Static list of tabs/genres for filtering contents.
  const [tab, setTab] = useState(["",'fantasy','Nonfiction','Animals','Autobiography','Memoir','Biography','Young Adult','Romance','Paranormal','Science Fiction','Steampunk','Horror','Thriller','Mystery','Crime'])
  
  // Fetch contents on component mount.
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  // Update filteredData based on search input or when contents change.
  useEffect(() => {
    const filtered = contents.filter(content =>
      content.genres?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, contents]);

  // Show loading state.
  if (isLoading) {
    return <span className="loading loading-bars loading-md"></span>;
  }
  // Show error state.
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Main render return.
  return (
    <section className='bg-base-300'>
      <Navbar />
      <section className='flex flex-col justify-center items-center' >
        <div className='w-[96%] grid gap-2 grid-cols-3 max-sm:text-sm sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 p-6 border-primary border-2 border-solid rounded-xl '>
          {tab.map((value, index) => {
            return(
              <div key={index} className='flex  gap-3  items-center'>
                <input type="radio" name="radio-1" className="radio" onClick={() => setSearch(value)} />
                <p>{value} {index == 0 ?"all":""}</p>
              </div>)
          })}
        </div>

        <div className='grid  gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-8 '>
          {filteredData.map((content) => (
            <div className=' flex flex-col  h-[355px]   p-2 rounded-md ' key={content.id}>
              <Link href={`/Books/${content.id}`} className='flex flex-col gap-3'>
                <img
                  className='w-full h-[280px] rounded hover:scale-[1.06] transition-[2s]'
                  src={content.image_url}
                  alt={content.title} 
                />
                <h1 className='font-bold  text-center hover:text-primary'>{content.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

// Export the Page component for use in the application.
export default Page;
