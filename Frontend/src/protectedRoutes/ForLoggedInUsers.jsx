import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { LockKeyhole } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForLoggedInUsers() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useSelector((state) => state.auth.isLoginCheckDone);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(`${ROUTES.SIGNIN}`);
    }
  }, [isLoggedIn, isLoginCheckDone, navigate]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }

  const handleClick = () => {
    navigate(`${ROUTES.SIGNIN}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto mt-10 border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-full">
          <LockKeyhole className="w-12 h-12 text-violet-700" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Please log in again
      </h2>
      <p className="text-gray-600 leading-relaxed text-center mb-6">
        You have been logged out or your session has expired. Please log in
        again to continue.
      </p>
      <Button className="w-full" onClick={handleClick}>
        Log In
      </Button>
    </div>
  );
}

export default ForLoggedInUsers;
