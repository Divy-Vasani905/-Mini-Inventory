import { useEffect, useState } from "react";

import { getDashboardSummary } from "../services/dashboardService";

import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  });

  const fetchSummary = async () => {
    try {
      const res = await getDashboardSummary();

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      <h1>Inventory Dashboard</h1>

      <div className="dashboard-grid">
        <DashboardCard
          title="Total Products"
          value={summary.totalProducts}
          color="blue"
        />

        <DashboardCard
          title="Total Orders"
          value={summary.totalOrders}
          color="green"
        />

        <DashboardCard
          title="Pending Orders"
          value={summary.pendingOrders}
          color="orange"
        />

        <DashboardCard
          title="Low Stock Products"
          value={summary.lowStockProducts}
          color="red"
        />
      </div>
    </div>
  );
}

export default Dashboard;
