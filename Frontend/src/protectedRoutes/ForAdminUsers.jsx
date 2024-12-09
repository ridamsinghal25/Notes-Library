import { UserRolesEnum } from "@/constants/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ForAdminUsers() {
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== UserRolesEnum.ADMIN) {
      navigate(-1);
    }
  }, [userRole, navigate]);

  return <Outlet />;
}

export default ForAdminUsers;
