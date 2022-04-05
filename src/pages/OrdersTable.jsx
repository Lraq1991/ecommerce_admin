import "./UsersTable.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "../components/MyTable";
import { useSelector } from "react-redux";
import FormEditUser from "../components/FormEditUser";
import { Button } from "react-bootstrap";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const admin = useSelector((state) => state.user);
  const [userDeleted, setUserDeleted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios({
          method: "GET",
          url: process.env.REACT_APP_API_URL + "/orders",
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDeleted, showForm]);

  return (
    <>
      {showForm ? (
        <div className="col">
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main>
                <div className="container-fluid px-4">
                  <h1 className="mt-4">Orders</h1>

                  <div className="card mb-4">
                    <div className="card-header d-flex aling-items-center justify-content-between">
                      <div className="data-table-user">
                        <i className="fas fa-table me-1"></i>
                      </div>

                      {/* <Link to={"/create-user"} className="btn btn-outline-primary">
                        Create User
                      </Link> */}
                    </div>
                    <div className="card-body">
                      <MyTable
                        users={users}
                        setUserDeleted={setUserDeleted}
                        userDeleted={userDeleted}
                        setShowForm={setShowForm}
                        showForm={showForm}
                        admin={admin}
                        setId={setId}
                      />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div className="col">
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main>
                <div className="container-fluid px-4">
                  <h1 className="mt-4">Users</h1>
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Edit Users
                    </div>
                    <div className="card-body">
                      <FormEditUser
                        id={id}
                        admin={admin}
                        setShowForm={setShowForm}
                        showForm={showForm}
                      />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersTable;
