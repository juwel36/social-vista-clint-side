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





const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
{
  path:'/',
  element:<Home></Home>
},
{
  path:'/membership',
  element:<PrivetRoute><MemberShip></MemberShip></PrivetRoute>
},
{
  path:'/details/:id',
  element: <PostDetail></PostDetail>,
  loader:({params})=> fetch(`http://localhost:5000/posts/${params.id}`)
}




    ]
  },

  // deshboard
  {
    path:'deshboard',
    element:  <Deshboard></Deshboard>,
    children:[
{
  path:'userHome',
element: <UserHome></UserHome>

},
{
  path:'myprofile',
element:<UserProfile></UserProfile>
},
{
  path:'addpost',
element:<AddPost></AddPost>
},
{
  path:'myposts',
element:<Mypost></Mypost>
}


    ]
  },
  {
    path:'/login',
    element:  <Login></Login>
  },
  {
    path:'/signup',
    element:<SignUp></SignUp>
  }
]);

export default router;