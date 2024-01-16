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
import ReApplyPageAssistance from "./pages/ReApplyPageAssistance.jsx";
import ReApplyPage from "./pages/ReApplyPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NotFoundNationalId from "./pages/NotFoundNationalId.jsx";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state?.user);
  const role = user.role ? user.role : null;
  console.log(role);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/applyassistance" element={<ApplyAssistancePage />} />
        <Route path="/reapplyassistance" element={<ReApplyPageAssistance />} />
        <Route path="/reapply/:nationalId" element={<ReApplyPage />} />
        <Route path="/notfoundbynationalid" element={<NotFoundNationalId />} />
        {role === "screener" && (
          <Route path="/screenerrequest" element={<ScreenerRequestPage />} />
        )}
        {role === "admin" && (
          <Route path="/adminRequest" element={<AdminRequestPage />} />
        )}
        {role === "admin" && (
          <Route path="/agentslist" element={<AgentsListPage />} />
        )}
        {(role === "admin" || role === "agent") && (
          <Route path="/agentemployee/:id" element={<EmployeeDetailPage />} />
        )}
        {role === "agent" && (
          <Route path="/agentemployee" element={<EmployeePage />} />
        )}
        {role === "agent" && (
          <Route path="/addemployee" element={<AddEmployeePage />} />
        )}

        {role === "admin" && (
          <Route path="/createuser" element={<CreateUserPage />} />
        )}
        {role === "screener" && (
          <Route
            path="/screenerrequest/agentfile"
            element={<AgentFliesPage />}
          />
        )}
        {role === "screener" && (
          <Route
            path="/screenerrequest/adminfile"
            element={<AdminFliePage />}
          />
        )}

        {role === "admin" && (
          <Route path="/adminRequest/agentfile" element={<AgentFliesPage />} />
        )}
        {role === "admin" && (
          <Route path="/adminRequest/adminfile" element={<AdminFliePage />} />
        )}
        {role === "admin" && (
          <Route path="/agentslist/agentfile" element={<AgentFliesPage />} />
        )}
        {role === "admin" && (
          <Route path="/agentslist/adminfile" element={<AdminFliePage />} />
        )}
        {role === "admin" && (
          <Route
            path="/agentslist/agentdetail"
            element={<AgentsDetailPage />}
          />
        )}
        {role === "admin" && (
          <Route path="/allemployee/:id" element={<EmployeeDetailPage />} />
        )}
        {role === "admin" && (
          <Route path="/agentslist/:id" element={<AgentEmployeePage />} />
        )}
        {role === "admin" && (
          <Route
            path="/agentslist/employee/:id"
            element={<EmployeeDetailPage />}
          />
        )}
        {role === "admin" && (
          <Route path="/allemployee" element={<AllEmployeePage />} />
        )}
        {role === "admin" && (
          <Route path="/adduser" element={<AddUserPage />} />
        )}
        {role === "admin" && (
          <Route path="/allusers" element={<AllUsersPage />} />
        )}
        {role === "admin" && (
          <Route path="/allusers/:id" element={<UserDetailPage />} />
        )}
        {role === "screener" && (
          <Route
            path="/screenerrequest/applicationdetail"
            element={<ApplicationDetail />}
          />
        )}
        {role === "admin" && (
          <Route
            path="/adminRequest/applicationdetail"
            element={<ApplicationDetail />}
          />
        )}
        {role === "admin" && (
          <Route path="/certeficate" element={<CerteficateGeneratorPage />} />
        )}
        {role === "agent" && (
          <Route
            path="/agentemployee/editemployee/:id"
            element={<EditEmployeeList />}
          />
        )}
        {role === "admin" && (
          <Route path="/allusers/editemployee/:id" element={<EditUserPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
