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
import ChatPage from "./pages/ChatPage.jsx";
import CerteficateGeneratorPage from "./pages/AdminPages/CerteficateGeneratorPage.jsx";
import EditEmployeeList from "./pages/Agents/EditEmployeeList.jsx";
import EditUserPage from "./pages/AdminPages/EditUserPage.jsx";
import ApplyAssistancePage from "./pages/ApplyAssistancePage.jsx";

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
        <Route path="/agentemployee/:id" element={<EmployeeDetailPage />} />
        <Route path="/agentemployee" element={<EmployeePage />} />
        <Route path="/addemployee" element={<AddEmployeePage />} />
        <Route path="/createuser" element={<CreateUserPage />} />
        <Route path="/screenerrequest/agentfile" element={<AgentFliesPage />} />
        <Route path="/screenerrequest/adminfile" element={<AdminFliePage />} />
        <Route path="/adminRequest/agentfile" element={<AgentFliesPage />} />
        <Route path="/adminRequest/adminfile" element={<AdminFliePage />} />
        <Route path="/agentslist/agentfile" element={<AgentFliesPage />} />
        <Route path="/agentslist/adminfile" element={<AdminFliePage />} />
        <Route path="/agentslist/agentdetail" element={<AgentsDetailPage />} />
        <Route path="/allemployee/:id" element={<EmployeeDetailPage />} />
        <Route path="/agentslist/:id" element={<AgentEmployeePage />} />
        <Route
          path="/agentslist/employee/:id"
          element={<EmployeeDetailPage />}
        />
        <Route path="/allemployee" element={<AllEmployeePage />} />
        <Route path="/adduser" element={<AddUserPage />} />
        <Route path="/allusers" element={<AllUsersPage />} />
        <Route path="/allusers/:id" element={<UserDetailPage />} />
        <Route
          path="/screenerrequest/applicationdetail"
          element={<ApplicationDetail />}
        />
        <Route
          path="/adminRequest/applicationdetail"
          element={<ApplicationDetail />}
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/certeficate" element={<CerteficateGeneratorPage />} />
        <Route
          path="/agentemployee/editemployee/:id"
          element={<EditEmployeeList />}
        />
        <Route path="/allusers/editemployee/:id" element={<EditUserPage />} />
        <Route path="/applyassistance" element={<ApplyAssistancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
