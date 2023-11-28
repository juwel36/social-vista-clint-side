import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Regestraion/SignUp";
import MemberShip from "../Pages/MemberShip/MemberShip";
import PrivetRoute from "../PrivetRouts/PrivetRoute";
import Deshboard from "../Pages/Deshboard/Deshboard";
import UserHome from "../Pages/Deshboard/UserHome";
import UserProfile from "../Pages/Deshboard/UserProfile";
import AddPost from "../Pages/Deshboard/AddPost";
import Mypost from "../Pages/Deshboard/Mypost";
import PostDetail from "../Pages/PostDetails.jsx/PostDetail";
import Comments from "../Pages/Comments/Comments";
import AdminProfile from "../Pages/Deshboard/AdminProfile";
import MakeAnnouncement from "../Pages/Deshboard/MakeAnnouncement";
import ManageUsers from "../Pages/Deshboard/ManageUsers";
import ReportedActivities from "../Pages/Deshboard/ReportedActivities";
import AdminRoute from "./AdminRoute";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      
      {
        path: '/membership',
        element: <PrivetRoute><MemberShip></MemberShip></PrivetRoute>
      },
      {
        path: '/details/:id',
        element: <PostDetail></PostDetail>,
        loader: ({ params }) => ({id: params.id }),


      },
      {
        path: '/comments/:postId',
        element: <Comments></Comments>,
        loader: ({ params }) => ({ postId: params.postId }),
      },




    ]
  },

  // deshboard
  {
    path: 'deshboard',
    element: <PrivetRoute>  <Deshboard></Deshboard></PrivetRoute>,
    children: [
      {
        path: 'userHome',
        element: <UserHome></UserHome>

      },
      {
        path: 'myprofile',
        element: <UserProfile></UserProfile>
      },
      {
        path: 'addpost',
        element: <AddPost></AddPost>
      },
      {
        path: 'myposts',
        element: <Mypost></Mypost>
      },
      // admin 

      {
        path: 'adminprofile',
        element:<AdminRoute> <AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'makeAnnouncement',
        element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'report',
        element:<AdminRoute> <ReportedActivities></ReportedActivities></AdminRoute>
      }


    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  }
]);

export default router;