import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LazyLoading from "./components/Loading/LazyLoading";

const Home = lazy(() => import("./Pages/Home"));
const LoginAdmin = lazy(() => import("./Pages/LoginAdmin"));
const Admin = lazy(() => import("./Pages/Admin/index"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LazyLoading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login-admin",
    element: (
      <Suspense fallback={<LazyLoading />}>
        <LoginAdmin />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LazyLoading />}>
        <Admin />
      </Suspense>
    ),
  },
];

function App() {
  return useRoutes(routes);
}

export default App;
