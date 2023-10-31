import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginAndSignin from "./Pages/Login/LoginAndSignin.jsx";
import { action as SignInAndSignUpAction } from "./Pages/Login/LoginAndSignin.jsx";
import Chatapp from "./Components/Chatapp";
import AuthContextProvider from "./Components/AuthContextProvider.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import DataContextprovider from "./Components/DataContextprovider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginAndSignin />,
        action: SignInAndSignUpAction,
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Chatapp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextprovider>
        <RouterProvider router={router} />
      </DataContextprovider>
    </AuthContextProvider>
  </React.StrictMode>
);
