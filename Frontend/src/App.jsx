import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/pageComponent/PageLayout";
import { ROUTES } from "./constants/route";
import NotesPage from "./pages/NotesPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ForLoggedInUsers from "./protectedRoutes/ForLoggedInUsers";
import PublicRoutes from "./protectedRoutes/PublicRoutes";
import LayoutWithSidebar from "./components/basic/Sidebar/LayoutWithSidebar";
import PageNotFound from "./pages/PageNotFound";
import OverviewPage from "./pages/OverviewPage";
import { lazy, Suspense } from "react";
import SkeletonUI from "./components/basic/Skeleton";
import ProfilePageContainer from "./pages/ProfilePage/container/ProfilePageContainer";
import AccountPageContainer from "./pages/Account/container/AccountPageContainer";
import ForgotPasswordPageContainer from "./pages/ForgotPassword/container/ForgotPasswordPageContainer";
import HomeContainer from "./pages/Home/container/HomeContainer";
import InputOTPContainer from "./pages/InputOTP/container/InputOTPContainer";

const NotesSubjectPage = lazy(() => import("./pages/NotesSubjectPage"));

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />} errorElement={<PageNotFound />}>
        <Route element={<ForLoggedInUsers />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path={ROUTES.HOME} element={<HomeContainer />} />
            <Route path={ROUTES.SETTING} element={<AccountPageContainer />} />
            <Route path={ROUTES.NOTES} element={<NotesPage />} />
            <Route
              path={ROUTES.NOTES_SUBJECT}
              element={
                <Suspense fallback={<SkeletonUI />}>
                  <NotesSubjectPage />
                </Suspense>
              }
            />
            <Route path={ROUTES.PROFILE} element={<ProfilePageContainer />} />
          </Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.OVERVIEW} element={<OverviewPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
          <Route path={ROUTES.VERIFYCODE} element={<InputOTPContainer />} />
          <Route
            path={ROUTES.RESET_PASSWORD}
            element={<ForgotPasswordPageContainer />}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
