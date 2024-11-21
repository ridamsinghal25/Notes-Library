import { ROUTES } from "@/constants/route";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForLoggedInUsers() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoginCheckDone = useSelector((state) => state.auth.isLogInCheckDone);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && !isLoggedIn) {
      navigate(`${ROUTES.OVERVIEW}`);
      toast.info("Please sign in again");
    }
  }, [isLoggedIn, isLoginCheckDone, navigate]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }

  return <></>;
}

export default ForLoggedInUsers;
