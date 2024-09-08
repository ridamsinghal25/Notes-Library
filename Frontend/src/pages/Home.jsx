import { Button } from "@/components/ui/button";
import {
  EXPLORE_BUTTON_TEXT,
  HOME_TEXT_CONTENT,
  TYPED_STRINGS,
} from "../constants/constants";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { ROUTES } from "../constants/route";
import notebookLogo from "../assets/notebook.svg";

function Home() {
  const typeElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeElement.current, {
      strings: TYPED_STRINGS,
      backDelay: 400,
      typeSpeed: 150,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl px-4 py-8 -mt-48 md:-mt-24">
          <div className="flex flex-col-reverse mdl:flex-row items-center justify-center gap-16 gap-y-24">
            <div className="text-center mdl:text-left mdl:w-2/3">
              <div className="px-4 sm:px-6 mdl:px-8 lg:px-12 xl:px-16">
                <h1 className="text-2xl sm:text-3xl mdl:text-4xl lg:text-4xl font-bold text-gray-850 font-inter mb-2 leading-tight">
                  {HOME_TEXT_CONTENT.MAIN_TITLE}
                </h1>
                <h1 className="text-xl sm:text-2xl mdl:text-3xl lg:text-4xl font-bold text-gray-850 font-inter mb-2 leading-tight">
                  {HOME_TEXT_CONTENT.SUB_TITLE_PREFIX}
                  <span className="text-purple-500">
                    <strong>&lt;</strong>
                    <span ref={typeElement}> </span>
                    <strong>&gt;</strong>
                  </span>
                </h1>
                <h1 className="text-xl sm:text-2xl mdl:text-3xl lg:text-4xl font-bold text-gray-850 font-inter mb-4 leading-tight">
                  {HOME_TEXT_CONTENT.SUB_TITLE_SUFFIX}
                </h1>
                <p className="text-sm sm:text-base text-gray-850 mb-6 max-w-3xl">
                  {HOME_TEXT_CONTENT.DESCRIPTION_ONE}{" "}
                  {HOME_TEXT_CONTENT.DESCRIPTION_TWO}
                </p>
                <Link to={ROUTES.NOTES} className="inline-block">
                  <Button>{EXPLORE_BUTTON_TEXT}</Button>
                </Link>
              </div>
            </div>
            <div className="w-52 h-52 mt-8 mdl:mt-0 md:ml-8">
              <img src={notebookLogo} alt="Notebook logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
