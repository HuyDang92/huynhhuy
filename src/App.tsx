import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LazyLoading from "./components/Loading/LazyLoading";

const Home = lazy(() => import("./Pages/Home"));

const routes = [
   {
      path: "/",
      element: (
         <Suspense fallback={<LazyLoading />} >
            <Home />
         </Suspense>
      ),
   },
];
function App() {
   return useRoutes(routes);
}

export default App;
