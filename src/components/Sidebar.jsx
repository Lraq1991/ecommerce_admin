import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-secondary sidebar p-3">
      <div>
        <div className="py-2">
          <span className="sb-section">Core</span>
          <div>
            <span className="sb-tag">
              <Link to={"/dashboard"} className="text-reset">
                Dashboard
              </Link>
            </span>
          </div>
        </div>
        <div className="py-2">
          <span className="sb-section">Management</span>
          <div className="sb-tag">
            <Link to={"/products"} className="text-reset">
              Products
            </Link>
          </div>
          <div className="sb-tag">
            <Link to={"/users"} className="text-reset">
              Users
            </Link>
          </div>
          <div className="sb-tag">
            <Link to={"/categories"} className="text-reset">
              Categories
            </Link>
          </div>
          <div className="sb-tag">
            <Link to={"/categories"} className="text-reset">
              Orders
            </Link>
          </div>
        </div>
      </div>
      <div>footer</div>
    </div>
  );
}

export default Sidebar;
