import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
          <ToastContainer />
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
