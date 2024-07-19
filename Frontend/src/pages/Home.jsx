import { Button } from "@/components/ui/button";
import {
  BACK_DELAY,
  EXPLORE_BUTTON_TEXT,
  LOOP_INFO,
  TEXT_CONTENT,
  TYPE_SPEED,
  TYPED_STRINGS,
} from "../constants/home.constants";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { ROUTES } from "../constants/route.constants";

function Home() {
  const typeElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeElement.current, {
      strings: TYPED_STRINGS,
      backDelay: BACK_DELAY,
      typeSpeed: TYPE_SPEED,
      loop: LOOP_INFO,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl px-4 py-8 -mt-16 md:-mt-24">
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-16 gap-y-24">
            <div className="text-center md:text-left md:w-2/3">
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-850 font-inter mb-2 leading-tight">
                  {TEXT_CONTENT.MAIN_TITLE}
                </h1>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-850 font-inter mb-2 leading-tight">
                  {TEXT_CONTENT.SUB_TITLE_PREFIX}
                  <span className="text-purple-500">
                    <strong>&lt;</strong>
                    <span ref={typeElement}> </span>
                    <strong>&gt;</strong>
                  </span>
                </h1>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-850 font-inter mb-4 leading-tight">
                  {TEXT_CONTENT.SUB_TITLE_SUFFIX}
                </h1>
                <p className="text-sm sm:text-base text-gray-850 mb-6 max-w-3xl">
                  {TEXT_CONTENT.DESCRIPTION_ONE} {TEXT_CONTENT.DESCRIPTION_TWO}
                </p>
                <Link to={ROUTES.NOTES} className="inline-block">
                  <Button>{EXPLORE_BUTTON_TEXT}</Button>
                </Link>
              </div>
            </div>
            <div className="w-52 h-52 mt-8 md:mt-0 md:ml-8">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 112.83 122.88"
                width="100%"
                height="100%"
              >
                <title>notebook</title>
                <path
                  className="fill-current text-gray-850"
                  d="M103.3,34.19l8.23,3.52a2.15,2.15,0,0,1,1.13,2.82l-2,4.56L98.53,39.88l2-4.56a2.15,2.15,0,0,1,2.82-1.13ZM8.88,7.88h8.19V2.73a2.74,2.74,0,0,1,5.47,0V7.88h12V2.73a2.73,2.73,0,1,1,5.46,0V7.88H52V2.73a2.73,2.73,0,0,1,5.46,0V7.88h12V2.73a2.73,2.73,0,0,1,5.46,0V7.88h9.27a8.91,8.91,0,0,1,8.88,8.88V28.54a12.27,12.27,0,0,0-1.76,2.9l-2,4.56A10,10,0,0,0,89,37.16a11.24,11.24,0,0,0-.58,1.15l-.6,1.4V16.76a3.6,3.6,0,0,0-3.58-3.58H75v5.15a2.73,2.73,0,0,1-5.46,0V13.18h-12v5.15a2.73,2.73,0,0,1-5.46,0V13.18H40v5.15a2.73,2.73,0,1,1-5.46,0V13.18h-12v5.15a2.74,2.74,0,0,1-5.47,0V13.18H8.88A3.58,3.58,0,0,0,5.3,16.76v92a3.6,3.6,0,0,0,3.58,3.59H59.16l.56,5.29H8.88A8.89,8.89,0,0,1,0,108.77v-92A8.91,8.91,0,0,1,8.88,7.88ZM20.34,94.35a2.65,2.65,0,0,1,0-5.3H66.72l-2.27,5.3Zm0-17.48a2.65,2.65,0,0,1,0-5.3H72.78a2.52,2.52,0,0,1,1.27.35l-2.12,5Zm0-17.48a2.65,2.65,0,0,1,0-5.3H72.78a2.65,2.65,0,0,1,0,5.3Zm0-17.48a2.65,2.65,0,0,1,0-5.3H72.78a2.65,2.65,0,0,1,0,5.3ZM81,114.6l-6.19,5c-4.85,3.92-4.36,5.06-5-.88l-1-9.34h0L97.54,42.18l12.18,5.22L81,114.6Zm-10.09-4.31,8,3.42L74.82,117c-3.19,2.58-2.87,3.32-3.28-.57l-.66-6.14Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
