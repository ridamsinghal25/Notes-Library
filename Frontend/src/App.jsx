import { Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import { ROUTES } from "./constants/route";
import ForLoggedInUsers from "./protectedRoutes/ForLoggedInUsers";
import PublicRoutes from "./protectedRoutes/PublicRoutes";
import LayoutWithSidebar from "./components/basic/Sidebar/LayoutWithSidebar";
import { lazy, Suspense } from "react";
import NotesSubjectPageSkeleton from "./components/basic/NotesSubjectPageSkeleton";
import ProfilePageContainer from "./pages/ProfilePage/container/ProfilePageContainer";
import AccountPageContainer from "./pages/Account/container/AccountPageContainer";
import ForgotPasswordPageContainer from "./pages/ForgotPassword/container/ForgotPasswordPageContainer";
import HomePageContainer from "./pages/Home/container/HomePageContainer";
import InputOTPPageContainer from "./pages/InputOTP/container/InputOTPPageContainer";
import SignupPageContainer from "./pages/Signup/container/SignupPageContainer";
import SigninPageContainer from "./pages/Signin/container/SigninPageContainer";
import PageNotFoundPageContainer from "./pages/PageNotFound/container/PageNotFoundPageContainer";
import OverviewPageContainer from "./pages/Overview/container/OverviewPageContainer";
import NotesPageContainer from "./pages/Notes/container/NotesPageContainer";
import FeedbackPageContainer from "./pages/Feedback/container/FeedbackPageContainer";
import PdfPageContainer from "./pages/PdfPage/container/PdfPageContainer";
import CourseContainer from "./pages/Course/container/CourseContainer";
import ForAdminUsers from "./protectedRoutes/ForAdminUsers";

const NotesSubjectPageContainer = lazy(() =>
  import("./pages/NotesSubject/container/NotesSubjectPageContainer")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route element={<ForLoggedInUsers />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path={ROUTES.HOME} element={<HomePageContainer />} />
            <Route path={ROUTES.SETTING} element={<AccountPageContainer />} />
            <Route path={ROUTES.NOTES} element={<NotesPageContainer />} />
            <Route
              path={ROUTES.NOTES_SUBJECT}
              element={
                <Suspense fallback={<NotesSubjectPageSkeleton />}>
                  <NotesSubjectPageContainer />
                </Suspense>
              }
            />
            <Route path={ROUTES.PROFILE} element={<ProfilePageContainer />} />
            <Route path={ROUTES.FEEDBACK} element={<FeedbackPageContainer />} />
            <Route path={ROUTES.PDF} element={<PdfPageContainer />} />
            <Route element={<ForAdminUsers />}>
              <Route path={ROUTES.COURSE} element={<CourseContainer />} />
            </Route>
          </Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.OVERVIEW} element={<OverviewPageContainer />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPageContainer />} />
          <Route path={ROUTES.SIGNIN} element={<SigninPageContainer />} />
          <Route path={ROUTES.VERIFYCODE} element={<InputOTPPageContainer />} />
          <Route
            path={ROUTES.RESET_PASSWORD}
            element={<ForgotPasswordPageContainer />}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFoundPageContainer />} />
    </Routes>
  );
}

export default App;
