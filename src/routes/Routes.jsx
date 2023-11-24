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