import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Users from "./components/Users";
import PaymentList from "./components/PaymentList";
//import Analytics from "./components/Analytics";
import AdminLayout from "./components/AdminLayout";
import AnalyticsDashboard from "./components/AnalyticsDashboard";


function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
      
        <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/payments" element={<AdminLayout><PaymentList /></AdminLayout>} />
        <Route path="/analytics" element={<AdminLayout><AnalyticsDashboard /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
