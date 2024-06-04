import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import all componets
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import router from "./router";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Username></Username>,
//   },
//   {
//     path: "/register",
//     element: <Register></Register>,
//   },
//   {
//     path: "/password",
//     element: <Password></Password>,
//   },
//   {
//     path: "/profile",
//     element: <Profile></Profile>,
//   },
//   {
//     path: "/recovery",
//     element: <Recovery></Recovery>,
//   },
//   {
//     path: "/reset",
//     element: <Reset></Reset>,
//   },
//   {
//     path: "*",
//     element: <PageNotFound></PageNotFound>,
//   },
// ]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const username = decoded.username;
        console.log("decoded: ", decoded);
        console.log("username: ", username);
        dispatch(setUsername(username));
        dispatch(setActive(true));
      } catch (error) {
        console.error("Invalid token");
        // localStorage.removeItem("token");
      }
    }
  });
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
