import LandingPage from './ui/CTA/landingPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import LoginPage from './ui/Auth/loginPage'
import SignUp from './ui/Auth/SignUp'
import GuestPage from './ui/Guest/GuestPage'
import GuestShop from './ui/Guest/GuestShop'
import UserPage from './ui/User/UserPage'
import UserShop from './ui/User/UserShop'
import AdminPage from './ui/Admin/AdminPage'
import User from './ui/Auth/User'
import Home from './ui/home'
import Shop from './ui/Shop'
const router =createBrowserRouter([
  {element:<AppLayout/>,children:[
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"newuser",element:<User/>,children:[
        {path:"login",element:<LoginPage/>},
        {path:"signup",element:<SignUp/>},
      ]
    },{
      path:"home",element:<Home/>, children:[
        {path:"guest/:name", element:<GuestPage/>},
        {path:"user/:usernameid", element:<UserPage/>},
        {path:"admin/:adminid",element:<AdminPage/>}
      ]
    },
    {path:"shop",element:<Shop/>,children:[
      {path:"guest/:name",element:<GuestShop/>},
      {path:"user:usernameid" , element:<UserShop/>}
    ]}
  ]}
])


function App() {
  

  return <RouterProvider router ={router}/>
}

export default App
