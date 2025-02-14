"use client";
import Hero from "./Hero";
import Features from "./Features";
import WhatCanYouStore from "./WhatCanYouStore";
import { useEffect } from "react";
import "@/styles/homepage.css"

export default function Homepage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        //   entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".cus-hidden");
    hiddenElements.forEach((ei) => observer.observe(ei));

    return () => {
      hiddenElements.forEach((ei) => observer.unobserve(ei));
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <Hero />
      <Features />
      <WhatCanYouStore />
    </>
  );
}
