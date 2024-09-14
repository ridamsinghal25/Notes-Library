import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { login, logout, updateLoginCheckDone } from "@/store/AuthSlice";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/route";

function PageLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser(
      {},
      {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      }
    );

    if (!(response instanceof ApiError)) {
      dispatch(login(response?.data));

      toast.success("user login successfully");
    } else if (
      response?.errorResponse?.message === "Invalid token" &&
      response?.errorResponse?.statusCode === 404
    ) {
      toast.warn("Please enable cookies settings in your browser");

      dispatch(logout());

      navigate(`${ROUTES.SIGNIN}`);
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
