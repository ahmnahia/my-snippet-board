"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  //This useEffect is to fix this: Warning: Prop `className` did not match. Server:
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <div
        className={`text-2xl cursor-pointer text-gray-500  ${
          theme == "dark" ? "hidden" : "block"
        }`}
        onClick={() => {
          setTheme("dark");
        }}
      >
        <BsFillMoonStarsFill className=""/>
      </div>{" "}
      <div
        className={`text-2xl cursor-pointer text-orange-300 ${
          theme == "dark" ? "block" : "hidden"
        }`}
        onClick={() => {
          setTheme("light");
        }}
      >
        <FaSun />
      </div>
    </>
  );
}
