import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import AuthOptions from "../pages/AuthOptions";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import TrackedHistory from "../pages/TrackedHistory";
import NotFound from "../components/common/loaders/NotFound";
import ResetPassword from "../pages/ResetPassword";
import ShareFood from "../pages/ShareFood";
import Donations from "../pages/Donations";
import EditDonation from "../pages/EditDonation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<AuthOptions />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/home" element={<Home />} />
      <Route path="/history" element={<TrackedHistory />} />
      <Route path="/share-food" element={<ShareFood />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/edit-donation/:id" element={<EditDonation />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
