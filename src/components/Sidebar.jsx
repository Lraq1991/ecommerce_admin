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
              <Link to={"/dashboard"}>Dashboard</Link>
            </span>
          </div>
        </div>
        <div className="py-2">
          <span className="sb-section">Interface</span>
          <div className="sb-tag">Layout</div>
          <div className="sb-tag">Pages</div>
          <div>
            <Link to={"/products"}>Products</Link>
          </div>
          <div>
            <Link to={"/categories"}>Categories</Link>
          </div>
        </div>
        <div className="py-2">
          <span className="sb-section">Addons</span>
          <div className="sb-tag">Charts</div>
          <div className="sb-tag">
            <Link to={"/tables"}>Tables</Link>
          </div>
          <div className="sb-tag">
            <Link to={"/users"}>Users</Link>
          </div>
        </div>
      </div>
      <div>footer</div>
    </div>
  );
}

export default Sidebar;
