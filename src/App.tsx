import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const LoginAdmin = lazy(() => import("./Pages/LoginAdmin"));
const Admin = lazy(() => import("./Pages/Admin/index"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login-admin",
    element: (
      <Suspense fallback={null}>
        <LoginAdmin />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    ),
  },
];

function App() {
  return useRoutes(routes);
}

export default App;
