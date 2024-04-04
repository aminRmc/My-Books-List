"use client";
import Navbar from "./component/Navbar";
import Carrousel from "./component/carrousel";
import Footer from "./component/Footer";
export default function Home() {

  return (
    <body className="flex min-h-screen w-full flex-col items-center bg-base-300">
    <Navbar/>
    <main className="flex w-full items-center justify-between flex-col bg-base-100  ">
    <section className="w-full h-[48em] bg-fixed bg-[url(./../../public/banner.webp)] bg-center bg-cover"> <div className="w-full h-full bg-[#00000074]"></div></section>
    <Carrousel/>
    <Footer/>
    </main>
    </body>
)}