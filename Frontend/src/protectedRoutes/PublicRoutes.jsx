import { ROUTES } from "@/constants/route";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function PublicRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useSelector((state) => state.auth.isLogInCheckDone);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && isLoggedIn) {
      navigate(`${ROUTES.HOME}`);
    }
  }, [isLoggedIn, isLoginCheckDone, navigate]);

  return <Outlet />;
}

export default PublicRoutes;
