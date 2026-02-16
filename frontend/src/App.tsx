import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { RedirectAuthedHome, RequireAuth } from "./state/auth/hooks";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />

      <Route
        path="/login"
        element={
          <RedirectAuthedHome>
            <LoginPage />
          </RedirectAuthedHome>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectAuthedHome>
            <SignupPage />
          </RedirectAuthedHome>
        }
      />
    </Routes>
  );
}

export default App;
