import "./Home.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Home() {
  const [showSidebar, setShowSidebar] = useState(null);

  return (
    <div className="container home-container p-0 m-0 mw-100">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <span
          className="navbar-brand ps-3"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <div className="sb-hamburg bg-light"></div>
        </span>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
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
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
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
        {showSidebar && (
          <div className="col">
            <Sidebar />
          </div>
        )}
        <div className="col">
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main>
                <div className="container-fluid px-4">
                  <h1 className="mt-4">Dashboard</h1>
                  <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card bg-primary text-white mb-4">
                        <div className="card-body">Primary Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <span className="small text-white stretched-link">
                            View Details
                          </span>
                          <div className="small text-white">
                            <i className="fas fa-angle-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card bg-warning text-white mb-4">
                        <div className="card-body">Warning Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <span className="small text-white stretched-link">
                            View Details
                          </span>
                          <div className="small text-white">
                            <i className="fas fa-angle-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card bg-success text-white mb-4">
                        <div className="card-body">Success Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <span className="small text-white stretched-link">
                            View Details
                          </span>
                          <div className="small text-white">
                            <i className="fas fa-angle-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card bg-danger text-white mb-4">
                        <div className="card-body">Danger Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <span className="small text-white stretched-link">
                            View Details
                          </span>
                          <div className="small text-white">
                            <i className="fas fa-angle-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="card mb-4">
                        <div className="card-header">
                          <i className="fas fa-chart-area me-1"></i>
                          Area Chart Example
                        </div>
                        <div className="card-body">
                          <canvas
                            id="myAreaChart"
                            width="100%"
                            height="40"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="card mb-4">
                        <div className="card-header">
                          <i className="fas fa-chart-bar me-1"></i>
                          Bar Chart Example
                        </div>
                        <div className="card-body">
                          <canvas
                            id="myBarChart"
                            width="100%"
                            height="40"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                  <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">
                      Copyright &copy; Your Website 2022
                    </div>
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
      </div>
    </div>
  );
}

export default Home;
