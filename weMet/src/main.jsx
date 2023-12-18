import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Registration from './Registration.jsx';
import Home from './pages/Home.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import store from './store.jsx';
import { Provider } from 'react-redux';
import firebaseConfig from './authentication/firebaseConfig.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/home",
    element: <Home/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode store={store}>
    <Provider>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
