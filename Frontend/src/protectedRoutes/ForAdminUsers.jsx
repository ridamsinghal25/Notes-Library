import { UserRolesEnum } from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ForAdminUsers() {
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== UserRolesEnum.ADMIN) {
      navigate(ROUTES.HOME);
    }
  }, [userRole, navigate]);

  return <Outlet />;
}

export default ForAdminUsers;
