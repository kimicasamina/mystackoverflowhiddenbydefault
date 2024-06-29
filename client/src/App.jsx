// rrd imports
import { Route, Routes, Router, useNavigate } from 'react-router-dom'

// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";

// libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Pages and components
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile';
import Nav from './components/Nav';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NoteIndex from './pages/NoteIndex';


// const router = createBrowserRouter([
//   {
//     path:'/',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <IndexPage />,
//       },
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'signup',
//         element: <Signup />,
//       },
//       {
//         path: ':profile',
//         element: <ProtectedRoute/>, // protected route
//         children: [
//           {
//             index: true,
//             element: <Profile />,
//           },    
//           {
//             path: ':slug',
//             element: <NoteIndex />,
//           }    
//         ],
//       },

//     ]
//   },

// ])



function App() {
  const user = useSelector(state => state.user?.userInfo)
  const [toggleAdd, setToggleAdd] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log("APP", user)

  return (
    <>
      <div className='relative w-full h-screen bg-white grid'>
        <Nav setToggleAdd={setToggleAdd} />
        <main className="mt-[80px] padding-y  w-full max-w-[1440px] mx-auto px-4 md:px-10 bg-white ">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </>
    // <>
    //   {/* <RouterProvider router={router} /> */}

      
    //     <Routes>
    //       <Route path='/' element={<Layout />} >
    //         <Route index element={<IndexPage />} />
    //         <Route path='/login' element={<Login />} />
    //         <Route path='/signup' element={<Signup />} />
    //         <Route path='/:profile' element={<ProtectedRoute />} >
    //           <Route index element={<Profile />} />
    //           <Route path='/:profile/:slug' element={<NoteIndex />} />
    //         </Route>
    //       </Route>
    //     </Routes>
    // </>
  )
}

export default App
