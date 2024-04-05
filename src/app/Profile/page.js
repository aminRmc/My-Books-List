"use client"
import Navbar from '../component/Navbar'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { removefav } from '@/store/slice/connexion';

function Page() {
  const user = useSelector((state) => state.connexion.user);
  const dispatch = useDispatch();

  return (
    <section className='w-full flex flex-col items-center'>
      <Navbar />
      <div className='w-full flex gap-10 justify-center items-center pt-20'>
        <div className='h-[150px] w-[150px] rounded-full bg-red-700'>
        </div>
        <div className='flex flex-col gap-2'>
          <button className="btn rounded-3xl" onClick={() => document.getElementById('my_modal_2').showModal()}>change avatar</button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <p> User : {user?.[0]?.user || 'N/A'}</p>
          <p> Mail : {user?.[0]?.mail || 'N/A'}</p>
        </div>
      </div>
      <div className='w-1/2 flex flex-col pt-20'>
        <h1>My Fav</h1>
        <hr className='border-secondary border-solid border-1 w-full' />
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7  p-4'>
          {user?.[0]?.fav?.map((value, index) => (
            <div key={value.id} className="relative">
              <Link href={`/Books/${value.id}`}>
                <img className='h-[150px] w-[110px]' src={value.image_url} alt="" />
              </Link>
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => { dispatch(removefav(index)) }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page;
