import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { login, logout, updateLoginCheckDone } from "@/store/AuthSlice";

function PageLayout() {
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    const response = await AuthService.getCurrentUser();

    if (!(response instanceof ApiError)) {
      dispatch(login(response?.data));
    } else {
      dispatch(logout());
    }

    dispatch(updateLoginCheckDone(true));
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <Sidebar />
      <main className="mx-5 mt-16 lgl:ml-[300px] lgl:mt-3">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
