import React from "react";
import AdminLogin from "./Screen/Login/AdminLogin";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterAdmin from "./Screen/registerForm/RegisterAdmin";
import SideBar from "./Component/SideBar";
import UserManagment from "./Screen/UserManagment";
import DocumentsTab from "./Component/DocumentsTab";
import Dashboard from "./Screen/Dashboard";
import { UserTabs } from "./Component/UserComponent/UserTab";
import Chat from "./Screen/Chat/Chat";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<RegisterAdmin />} />

          <Route
            path="/dashboard"
            element={
              <SideBar>
                <Dashboard />
              </SideBar>
            }
          />
          <Route
            path="/"
            element={
              <SideBar>
                <DocumentsTab />
              </SideBar>
            }
          />
          <Route
            path="/userManagment"
            element={
              <SideBar>
                <UserManagment />
              </SideBar>
            }
          />

          <Route path="/userhome" element={<UserTabs />} />
          <Route
            path="/chat"
            element={
              <SideBar>
                <Chat />
              </SideBar>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
