import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { login, logout, updateLoginCheckDone } from "@/store/AuthSlice";
import AppLoader from "@/components/basic/AppLoader";

function PageLayout() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await AuthService.getCurrentUser(
        {},
        {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        }
      );

      if (!(response instanceof ApiError)) {
        dispatch(login(response?.data));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    } finally {
      setIsFetching(false);
      dispatch(updateLoginCheckDone(true));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return isFetching ? <AppLoader /> : <Outlet />;
}

export default PageLayout;
