import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { login, logout, updateLoginCheckDone } from "@/store/AuthSlice";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";

function PageLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser(
      {},
      {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      }
    );

    if (!(response instanceof ApiError)) {
      dispatch(login(response?.data));
    } else if (
      response instanceof ApiError &&
      response?.errorResponse?.message === "Please verify your email" &&
      !(
        location.pathname === ROUTES.SIGNUP ||
        location.pathname === ROUTES.VERIFYCODE
      )
    ) {
      dispatch(logout());
      navigate(`${ROUTES.VERIFYCODE}`);
      toast.error(response?.errorResponse?.message);
    } else {
      dispatch(logout());
    }

    dispatch(updateLoginCheckDone(true));
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <Outlet />;
}

export default PageLayout;
