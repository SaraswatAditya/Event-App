import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import all componets
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
// import ProtectedRoute from "./components/ProtectedRoute";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./components/UserDashboard";
import { setActive, setUsername } from "./store/authSlice";
import EditEvent from "./components/EditEvent";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
// import router from "./router";

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
        // console.log("decoded: ", decoded);
        // console.log("username: ", username);
        dispatch(setUsername(username));
        dispatch(setActive(true));
      } catch (error) {
        console.error("Invalid token", error);
        // localStorage.removeItem("token");
      }
    }
  }, [dispatch]);
  return (
    // <main>
    //   <Routes>
    //     <Route path="/home" element={<Home />} />
    //     <RouterProvider router={router}></RouterProvider>
    //   </Routes>
    // </main>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Username />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/password" element={<Password />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/recovery" element={<Recovery />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="*" element={<PageNotFound />} />
        {/* Event Routes */}
        <Route exact path="/events" element={<UserDashboard />} />
        <Route exact path="/events/update/:id" element={<EditEvent />} />
        <Route exact path="/events/:id" element={<EventDetail />} />
        <Route exact path="/events/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
