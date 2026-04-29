import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const path = window.location.pathname;

  if (path === "/" || path === "/login") return <LoginPage />;

  if (path === "/dashboard") {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );
  }

  if (path.startsWith("/detail")) {
    return (
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    );
  }

  if (path === "/form") {
    return (
      <ProtectedRoute>
        <FormPage />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ListPage />
    </ProtectedRoute>
  );
}

export default App;