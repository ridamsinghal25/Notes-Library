import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import { AccountPage } from "./pages/AccountPage";
import { ROUTES } from "./constants/route";
import NotesPage from "./pages/NotesPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import InputOTPForm from "./pages/InputOTPForm";
import ForLoggedInUsers from "./protectedRoutes/ForLoggedInUsers";
import PublicRoutes from "./protectedRoutes/PublicRoutes";
import LayoutWithSidebar from "./components/Sidebar/LayoutWithSidebar";
import NotesSubjectPage from "./pages/NotesSubjectPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route element={<ForLoggedInUsers />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SETTING} element={<AccountPage />} />
            <Route path={ROUTES.NOTES} element={<NotesPage />} />
            <Route path={ROUTES.NOTES_SUBJECT} element={<NotesSubjectPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
          <Route path={ROUTES.VERIFYCODE} element={<InputOTPForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
