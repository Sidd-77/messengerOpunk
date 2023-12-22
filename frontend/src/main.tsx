import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ChatProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </ChatProvider>
  </BrowserRouter>
);
