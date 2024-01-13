import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './sign-in-page';
import DashboardPage from './dashboard-page';
import LoggedIn from './components/Loggedin';

export default function App() {

  
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<SignInPage/>}
          />
          <Route
            path='/dashboard'
            element={<DashboardPage/>}
          />
          <Route
            path='/home'
            element={<LoggedIn/>}
          />
        
          </Routes>
      </BrowserRouter>
      
    
  )
}
