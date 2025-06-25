import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" reverseOrder={false} />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
