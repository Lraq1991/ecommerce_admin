import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark h-100 text-secondary sidebar p-4">
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
          <Link to={"/products"}>Products</Link>
        </div>
        <div className="py-2">
          <span className="sb-section">Addons</span>
          <div className="sb-tag">Charts</div>
          <div className="sb-tag">
            <Link to={"/tables"}>Tables</Link>
          </div>
        </div>
      </div>
      <div>footer</div>
    </div>
  );
}

export default Sidebar;
