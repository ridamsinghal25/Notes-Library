import { Route, Routes } from "react-router-dom";
import LayoutWithSidebar from "./components/Sidebar/LayoutWithSidebar";
import Home from "./pages/Home";
import { AccountPage } from "./pages/AccountPage";
import { ROUTES } from "./constants/route";
import NotesPage from "./pages/NotesPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import InputOTPForm from "./pages/InputOTPForm";

function App() {
  return (
    <Routes>
      <Route element={<LayoutWithSidebar />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SETTING} element={<AccountPage />} />
        <Route path={ROUTES.NOTES} element={<NotesPage />} />
        <Route path={ROUTES.PROFILE} element={<h1>Profile Page</h1>} />
      </Route>
      <Route>
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
        <Route path={ROUTES.VERIFYCODE} element={<InputOTPForm />} />
      </Route>
    </Routes>
  );
}

export default App;
