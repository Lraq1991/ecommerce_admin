import "./Home.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import userActions from "../redux/userActions";

function Home() {
  const [show, setShow] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.userLogout);
  };
  return (
    <div className="container home-container p-0 m-0 mw-100">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark nav-dist">
        <div className="pt-4 ps-4 sb-btn" onClick={() => setShow((prev) => !prev)}>
          <span className="navbar-brand ps-3">
            <div className="sb-hamburg"></div>
          </span>
        </div>
        <div>
          <h1 className="ps-4 text-white">Garden Oddities</h1>
        </div>

        <Dropdown>
          <Dropdown.Toggle className="text-secondary" variant="transparent">
            <i className="fas fa-user fa-fw"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
