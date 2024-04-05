"use client"
import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import Login from '../component/Login'
import Register from '../component/Register'
import { useSelector, useDispatch } from 'react-redux';

function Page() {

  const contents = useSelector((state) => state.connexion.value)
  const con = useSelector((state) => state.connexion.con)
  const user = useSelector((state) => state.connexion.user)
  return (
    <section className='min-h-screen'>
      <Navbar/>
    <section className='w-full max-md:p-0 max-md:pt-28 p-48 justify-center flex items-center'>
      {con==0?
    contents == 1 ? <Register/>:<Login/>:
    <div className='w-full justify-center flex  items-center text-3xl flex-col'>
      Bienvenue
      <p>{user[0].user}</p>
    {console.log(user)}
    </div>
    }
    </section>
    </section>
  )
}

export default Page 