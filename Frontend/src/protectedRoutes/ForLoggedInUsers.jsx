import { ROUTES } from "@/constants/route";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ForLoggedInUsers() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useSelector((state) => state.auth.isLogInCheckDone);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(`${ROUTES.OVERVIEW}`);
    }
  }, [isLoggedIn, isLoginCheckDone, navigate]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }

  return <></>;
}

export default ForLoggedInUsers;
