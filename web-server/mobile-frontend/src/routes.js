import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './sign-in-page'
import DashboardPage from './dashboard-page'

export default () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
        path='/'
        component={<SignInPage/>}
      />
      <Route
        path='/dashboard'
        component={<DashboardPage/>}
      />
    
      </Routes>
    </BrowserRouter>
  );
};