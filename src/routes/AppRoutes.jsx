import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import AuthOptions from "../pages/AuthOptions";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import NotFound from "../components/common/loaders/NotFound";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<AuthOptions />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/home" element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
