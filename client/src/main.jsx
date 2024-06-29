import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// redux
import { Provider } from 'react-redux'
import store from './redux/store.js';

// rrd imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// axios default settings
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/api'

// components and  pages
import IndexPage from './pages/IndexPage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Profile from './pages/Profile.jsx'
import NoteIndex from './pages/NoteIndex.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      {/* <Route index element={<IndexPage />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='' element={<ProtectedRoute />} >
        <Route path='/:profile' element={<Profile />} />
        <Route path='/:profile/:id' element={<NoteIndex />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
