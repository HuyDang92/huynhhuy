import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Loader } from "@react-three/drei";
import { BrowserRouter } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <BrowserRouter>
         <PortfolioProvider>
            <App />
            <Loader />
         </PortfolioProvider>
      </BrowserRouter>
   </React.StrictMode>
);
