"use client"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent } from "@/store/slice/apiSlice";
import Link from 'next/link';
import Navbar from '../component/Navbar';

function Page() {
    const dispatch = useDispatch();
    // Accessing contents, isLoading, and error directly from the Redux store.
    const contents = useSelector((state) => state.api.contents);
    const isLoading = useSelector((state) => state.api.isLoading);
    const error = useSelector((state) => state.api.error);
    // State to hold top rated contents.
    const [topRatedContents, setTopRatedContents] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    const [tab, setTab] = useState(["",'fantasy','Nonfiction','Animals','Autobiography','Memoir','Biography','Young Adult','Romance','Paranormal','Science Fiction','Steampunk','Horror','Thriller','Mystery','Crime'])

    // Fetch contents when the component mounts.
    useEffect(() => {
        dispatch(fetchContent());
    }, [dispatch]);

    // Effect to sort contents based on rating and update local state.
    useEffect(() => {
        const topRated = [...contents].sort((a, b) => b.rating - a.rating);
        setTopRatedContents(topRated);
        const filtered = topRated.filter(content =>
          content.genres?.toLowerCase().includes(search.toLowerCase())
        );setFilteredData(filtered);
    }, [search ,contents]);

    return (
        <section>
            <Navbar/>
            <div className='grid gap-2 grid-cols-3 max-sm:text-sm sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 p-4'>
          {tab.map((value, index) => {
            return(
                <div key={index} className='flex  gap-3  items-center'>
                <input type="radio" name="radio-1" className="radio" onClick={() => setSearch(value)} />
                <p>{value}</p>
              </div>)
          })}
        </div>
            {isLoading ? (
               <span className="loading loading-bars loading-md"></span>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-4'>

               { filteredData.map((content) => (
                    <div className='m-5 flex flex-col' key={content.id}>
                        <Link href={`/Books/${content.id}`}>
                            <>
                                <img
                                    className='w-full h-[280px] rounded hover:scale-[1.02] transition-[2s]'
                                    src={content.image_url}
                                    alt={content.title}
                                />
                                <h1 className='font-bold text-center'>{content.title}</h1>
                            </>
                        </Link>
                    </div>
                ))}
            </div>
            )}
        </section>
    );
}

export default Page;
