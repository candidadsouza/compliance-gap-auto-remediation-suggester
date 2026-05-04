import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";
import Analytics from "./pages/Analytics";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const path = window.location.pathname;

  // 🔐 Public routes
  if (path === "/" || path === "/login") return <LoginPage />;
  if (path === "/forgot-password") return <ForgotPassword />;
  if (path === "/register") return <Register />;

  // 📋 List Page (NEW ROUTE)
  if (path === "/list") {
    return (
      <ProtectedRoute>
        <ListPage />
      </ProtectedRoute>
    );
  }

  // 📊 Dashboard
  if (path === "/dashboard") {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );
  }

  // 📈 Analytics
  if (path === "/analytics") {
    return (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    );
  }

  // 📄 Detail Page
  if (path.startsWith("/detail")) {
    return (
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    );
  }

  // 📝 Form Page
  if (path === "/form") {
    return (
      <ProtectedRoute>
        <FormPage />
      </ProtectedRoute>
    );
  }

  // 🔁 fallback
  return <LoginPage />;
}

export default App;