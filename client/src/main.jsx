import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskProvider } from "./assets/context/TaskContext.jsx";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <CookiesProvider>
        <TaskProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TaskProvider>
      </CookiesProvider>
    </React.StrictMode>
  );
} else {
  console.error("❌ Root element not found. App failed to render");
}
