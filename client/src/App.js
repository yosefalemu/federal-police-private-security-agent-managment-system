import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRequestPage from "./pages/AdminPages/AdminRequestPage.jsx";
import ScreenerRequestPage from "./pages/Screener/ScreenerRequestPage.jsx";
import LoginPage from "./pages/LogInPage.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AgentsListPage from "./pages/AdminPages/AgentsListPage.jsx";
import EmployeePage from "./pages/Agents/EmployeePage.jsx";
import AddEmployeePage from "./pages/Agents/AddEmployeePage.jsx";
import CreateUserPage from "./pages/AdminPages/CreateUserPage.jsx";
import AgentFliesPage from "./pages/AgentFliesPage.jsx";
import AdminFliePage from "./pages/AdminFilePage.jsx";
import AgentsDetailPage from "./pages/AgentsDetailPage.jsx";
import EmployeeDetailPage from "./pages/Agents/EmployeeDetailPage.jsx";
import AgentEmployeePage from "./pages/AdminPages/AgentEmployeePage.jsx";
import AllEmployeePage from "./pages/AdminPages/AllEmployeePage.jsx";
import AddUserPage from "./pages/AdminPages/AddUserPage.jsx";
import AllUsersPage from "./pages/AdminPages/AllUsersPage.jsx";
import UserDetailPage from "./pages/AdminPages/UserDetailPage.jsx";
import ApplicationDetail from "./pages/Screener/ApplicationDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/screenerrequest" element={<ScreenerRequestPage />} />
        <Route path="/adminRequest" element={<AdminRequestPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/agentslist" element={<AgentsListPage />} />
        {/* <Route path="/allemployee" element={<EmployeePage />} /> */}
        <Route path="/agentemployee" element={<EmployeePage />} />
        <Route path="/addemployee" element={<AddEmployeePage />} />
        <Route path="/createuser" element={<CreateUserPage />} />
        <Route path="/agentsfile" element={<AgentFliesPage />} />
        <Route path="/adminfile" element={<AdminFliePage />} />
        <Route path="/agentdetail" element={<AgentsDetailPage />} />
        <Route path="/agentemployee/:id" element={<EmployeeDetailPage />} />
        <Route path="/agentemployeepage/:id" element={<AgentEmployeePage />} />
        <Route path="/allemployee" element={<AllEmployeePage />} />
        <Route path="/adduser" element={<AddUserPage />} />
        <Route path="/allusers" element={<AllUsersPage />} />
        <Route path="/allusers/:id" element={<UserDetailPage />} />
        <Route path="/applicationdetail" element={<ApplicationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
