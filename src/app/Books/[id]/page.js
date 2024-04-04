  "use client";
  import React, { useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchContent } from '@/store/slice/apiSlice';
  import Navbar from '@/app/component/Navbar';
  import Link from 'next/link';
  import { addfav } from '@/store/slice/connexion';
  import Image from 'next/image'

  export default function Page({ params }) {
    const user = useSelector((state) => state.connexion.user)
    const con = useSelector((state) => state.connexion.con)
    const dispatch = useDispatch();
    const id = params.id;
    const contents = useSelector((state) => state.api.contents);

    useEffect(() => {
      dispatch(fetchContent());
    }, [dispatch]);

    // Filtre pour trouver le contenu actuel et les livres du même auteur
    const currentContent = contents.find((content) => content.id == id);
    const otherBooksByAuthor = contents.filter((content) => content.authors == currentContent?.authors && content.id != id);


    return (
      <section className='min-h-screen w-full bg-base-200'>
        <Navbar/>

        <section className='w-full pt-10 flex justify-center'>
          {currentContent && (
            <div className='flex w-full max-w-4xl max-lg:flex-col min-h-sreen '>
              <div className='w-1/2 flex justify-center items-start pt-5 flex-col max-lg:w-full max-lg:flex-row max-lg:pl-4  max-lg:justify-center max-lg:items-center'>
                <img className='h-[500px] max-lg:h-[350px]' src={currentContent.image_url} alt={currentContent.title} />

                <div className='flex justify-center items-center w-full pt-5 gap-5 max-lg:flex-col max-lg:pt-4 '>
                <div className="radial-progress text-primary " style={{"--value":currentContent.rating*20}} role="progressbar">{currentContent.rating}/5</div>
                {con==1&&
                  user[0].fav.some(fav => fav.id === currentContent.id) ?
                  <button className='btn bg-secondary rounded-xl  max-md:w-36 max-sm:w-28' disabled>Déjà dans les favoris</button> :
                  <button className='btn bg-secondary rounded-xl  max-md:w-32' onClick={() => dispatch(addfav(currentContent))}>Ajouter aux favoris</button>
                } 
                </div>
              </div>

              <div className='w-1/2 pt-0 ml-4 max-lg:w-full max-lg:p-5 max-lg:m-0 '>
                <p><span className='font-bold text-primary'>Titre :</span> {currentContent.title}</p>
                <p><span className='font-bold text-primary'>Auteur :</span> {currentContent.authors}</p>
                <p className='text-[13px] h-[200px] overflow-auto '><span className='font-bold  text-primary'>Description :</span> {currentContent.description}</p>
                <p><span className='font-bold text-primary'>Genres :</span> {currentContent.genre_list}</p>
                {otherBooksByAuthor.length > 0 && (
                  <>
                    <h1 className='font-bold text-xl mt-4'>Livres du même auteur :</h1>
                    <div className='flex  text-orange-300 gap-2 w-full flex-wrap'>
                      {otherBooksByAuthor.map((book, index) => (
                        <Link className='' key={index} href={`/Books/${book.id}`}>
                          <img className='h-[180px] w-[120px]' src={book.image_url} alt="" srcset="" />
                  
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </section>
    );
  }
