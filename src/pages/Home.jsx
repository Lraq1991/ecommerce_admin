import "./Home.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
function Home() {
  const [show, setShow] = useState(null);
  return (
    <div className="container home-container p-0 m-0 mw-100">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <div className="pt-4 ps-4 sb-btn" onClick={() => setShow((prev) => !prev)}>
          <span className="navbar-brand ps-3">
            <div className="sb-hamburg"></div>
          </span>
        </div>
        <div>
          <h1 className="ps-4 ms-4 text-white">Garden Oddities</h1>
        </div>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </span>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <span className="dropdown-item">Settings</span>
              </li>
              <li>
                <span className="dropdown-item">Activity Log</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span className="dropdown-item">Logout</span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="row">
        {show && (
          <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6 pe-0">
            <Sidebar />
          </div>
        )}

        <div className="col p-0 pages-content">
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main className="px-4">
                <Outlet />
              </main>
            </div>
          </div>
          <footer className="py-4 bg-light mt-auto footer">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                <div>
                  <span>Privacy Policy</span>
                  &middot;
                  <span>Terms &amp; Conditions</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
