import "./UsersTable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FormEditUser from "../components/FormEditUser";
import { Table, Button, Form } from "react-bootstrap";
import { format as formatDate } from "date-fns";

function UsersTable() {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");
  const admin = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(true);
  const [statusEdit, setStatusEdit] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/orders",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };
  const handleClick = async (order) => {
    const orderId = order.id;
    console.log(newStatus);
    if (!newStatus) return alert("most select an option");
    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
      headers: { Authorization: `Bearer ${admin.token}` },
      data: {
        status: newStatus,
      },
    });
    getOrders();
  };
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
                        Data Table Orders
                      </div>
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
                                {statusEdit && <th>Status Edit</th>}
                                <th>Created</th>
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

                                  <td
                                    className="order-status"
                                    onClick={() => setStatusEdit((prev) => !prev)}
                                  >
                                    {order.status}
                                  </td>
                                  {statusEdit && (
                                    <td>
                                      <Form.Control
                                        as="select"
                                        id="cars"
                                        name="cars"
                                        onChange={(e) => handleChange(e)}
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="Failed">Failed</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Completed">Completed</option>
                                      </Form.Control>
                                      <Button
                                        variant="outline-primary"
                                        onClick={() => handleClick(order)}
                                      >
                                        Change
                                      </Button>
                                    </td>
                                  )}

                                  <td>{formatDate(new Date(order.createdAt), "MMMM-dd-Y")}</td>
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
