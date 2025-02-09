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
import UploadNotesContainer from "./pages/UploadNotes/container/UploadNotesContainer";
import LayoutWithoutSidebar from "./components/basic/Sidebar/LayoutWithoutSidebar";
import UpdateNotesContainer from "./pages/UpdateNotes/container/UpdateNotesContainer";
import ManageCourseContainer from "./pages/ManageCourse/container/ManageCourseContainer";
import CourseUsersContainer from "./pages/CourseUsers/container/CourseUsersContainer";
import CommentContainer from "./pages/Comment/container/CommentContainer";
import ForModeratorUsers from "./protectedRoutes/ForModeratorUsers";
import AddDailyNotesContainer from "./pages/AddDailyNotes/container/AddDailyNotesContainer";
import ListDailyNotesContainer from "./pages/ListDailyNotes/container/ListDailyNotesContainer";
import DailyNotesContainer from "./pages/DailyNotes/container/DailyNotesContainer";
import UpdateDailyNotesContainer from "./pages/UpdateDailyNotes/container/UpdateDailyNotesContainer";

const NotesSubjectPageContainer = lazy(() =>
  import("./pages/NotesSubject/container/NotesSubjectPageContainer")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route element={<ForLoggedInUsers />}>
          {/* With sidebar */}
          <Route element={<LayoutWithSidebar />}>
            {/* Home Routes */}
            <Route path={ROUTES.HOME} element={<HomePageContainer />} />

            {/* Settings Routes */}
            <Route path={ROUTES.SETTING} element={<AccountPageContainer />} />

            {/* Notes Routes */}
            <Route path={ROUTES.NOTES} element={<NotesPageContainer />} />

            {/* Notes Subject Routes */}
            <Route
              path={ROUTES.NOTES_SUBJECT}
              element={
                <Suspense fallback={<NotesSubjectPageSkeleton />}>
                  <NotesSubjectPageContainer />
                </Suspense>
              }
            />

            {/* Profile Routes */}
            <Route path={ROUTES.PROFILE} element={<ProfilePageContainer />} />

            {/* Feedback Routes */}
            <Route path={ROUTES.FEEDBACK} element={<FeedbackPageContainer />} />

            {/* PDF Routes */}
            <Route path={ROUTES.PDF} element={<PdfPageContainer />} />

            {/* For Admin User Routes */}
            <Route element={<ForAdminUsers />}>
              {/* Course Routes */}
              <Route path={ROUTES.COURSE} element={<CourseContainer />} />
            </Route>

            {/* List Daily Notes */}
            <Route
              path={ROUTES.LIST_DAILY_NOTES}
              element={<ListDailyNotesContainer />}
            />

            {/* Daily Notes Routes */}
            <Route
              path={ROUTES.DAILY_NOTES}
              element={<DailyNotesContainer />}
            />
          </Route>

          {/* Without sidebar */}
          <Route element={<LayoutWithoutSidebar />}>
            {/* For Admin User Routes */}
            <Route element={<ForAdminUsers />}>
              {/* Upload Notes Routes */}
              <Route
                path={ROUTES.UPLOAD_NOTES}
                element={<UploadNotesContainer />}
              />

              {/* Update Notes Routes */}
              <Route
                path={ROUTES.UPDATE_NOTES}
                element={<UpdateNotesContainer />}
              />

              {/* Manage Course Routes */}
              <Route
                path={ROUTES.MANAGE_COURSE}
                element={<ManageCourseContainer />}
              />

              {/* Course Users Routes */}
              <Route
                path={ROUTES.COURSE_USERS}
                element={<CourseUsersContainer />}
              />
            </Route>

            {/* Comment Routes */}
            <Route path={`${ROUTES.COMMENT}`} element={<CommentContainer />} />

            {/* For Moderator User Routes */}
            <Route element={<ForModeratorUsers />}>
              {/* Add Daily Notes Routes */}
              <Route
                path={ROUTES.ADD_DAILY_NOTES}
                element={<AddDailyNotesContainer />}
              />

              <Route
                path={ROUTES.UPDATE_DAILY_NOTES}
                element={<UpdateDailyNotesContainer />}
              />
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
