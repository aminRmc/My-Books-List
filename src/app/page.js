"use client";
import Navbar from "./component/Navbar";
import Carrousel from "./component/carrousel";
import Footer from "./component/Footer";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <section className="w-full h-[48em] bg-fixed bg-[url(./../../public/banner.webp)] bg-center bg-cover">
          <div className="w-full h-full bg-[#00000074]"></div>
        </section>
        <Carrousel/>
        <Footer/>
      </main>
    </>
  );
}
