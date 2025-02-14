// import Board from "@/components/BoardKonva";

import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/Hero";
import Homepage from "@/components/Homepage/Homepage";
import WhatCanYouStore from "@/components/Homepage/WhatCanYouStore";

export default function Home() {
  return (
    <div className=" w-full">
      <main className="">
        <Homepage />
        {/* <Board /> */}
        {/* 
        <Hero />
        <Features />
        <WhatCanYouStore /> */}
      </main>
      <footer className=""></footer>
    </div>
  );
}
