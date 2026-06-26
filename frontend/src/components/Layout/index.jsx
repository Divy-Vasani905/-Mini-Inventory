import { NavLink, Outlet } from "react-router-dom";

import "./style.css";

function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <h2>Inventory</h2>
        </div>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>Orders</span>
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
