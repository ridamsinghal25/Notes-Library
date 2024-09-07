// src/components/NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-2xl">Oops! Page Not Found</p>
      <p className="mt-2 text-lg">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 text-white bg-violet-600 rounded hover:bg-violet-700 transition duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
