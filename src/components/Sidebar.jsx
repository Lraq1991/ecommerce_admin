import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const userInfo = useSelector((state) => state.user);
  const user = `${userInfo.firstname} ${userInfo.lastname}`;

  return (
    <div className="bg-dark text-secondary sidebar p-3">
      <div>
        <div className="py-2">
          <div>
            <i className="fas fa-tachometer-alt pe-2"></i>
            <Link to={"/"} className="text-reset">
              <span className="sb-dash">Dashboard</span>
            </Link>
          </div>
        </div>
        <div className="py-2">
          <i className="fas fa-table pe-2"></i>
          <span className="sb-section">Tables</span>
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
            <Link to={"/orders"} className="text-reset">
              Orders
            </Link>
          </div>
        </div>
      </div>
      <div className="pb-5 mb-5">
        <div className="row">
          <h5>You are logged in as:</h5>
        </div>
        <div className="row text-white mt-2">
          <h6>{user}</h6>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
