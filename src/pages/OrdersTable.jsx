import "./UsersTable.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FormEditUser from "../components/FormEditUser";
import { Table, Button } from "react-bootstrap";
import { format as formatDate } from "date-fns";

function UsersTable() {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");
  const admin = useSelector((state) => state.user);
  const [userDeleted, setUserDeleted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios({
          method: "GET",
          url: process.env.REACT_APP_API_URL + "/orders",
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }

    getOrders();
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
                      {orders && (
                        <>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Products</th>
                                <th>Payment Type</th>
                                <th>Final Price</th>
                                <th>Shipping Address</th>
                                <th>Status</th>
                                <th>Created</th>
                                {/* <th>Actions</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>
                                    <ul>
                                      {order.products.map((product) => (
                                        <li key={product.id}>
                                          {product.name + " (" + product.quantity + ")"}
                                        </li>
                                      ))}
                                    </ul>
                                  </td>
                                  <td>{order.paymentType}</td>
                                  <td>{order.total}</td>
                                  <td>
                                    {`${order.shippingAddress.city}/${order.shippingAddress.street_address}`}
                                  </td>
                                  {/* <td>
                                    <ul>
                                      {order.shippingAddress.map((data) => (
                                        <li>hola</li>
                                      ))}
                                    </ul>
                                  </td> */}
                                  <td>{order.status}</td>
                                  <td>{formatDate(new Date(order.createdAt), "MMMM-dd-Y")}</td>
                                  {/* <td className="d-flex justify-content-between">
                                    <Button
                                      variant="secondary"
                                      onClick={() => {
                                        setId(user.id);
                                        setShowForm(!showForm);
                                      }}
                                    >
                                      <i className="fa-solid fa-user-pen"></i>
                                    </Button>
                                    <Button
                                      variant="outline-danger"
                                      onClick={() => handleDelete(user)}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                  </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </>
                      )}
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
