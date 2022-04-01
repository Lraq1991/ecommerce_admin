import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { format as formatDate } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function CreateUser() {
  const admin = useSelector((state) => state.user);
  const [showConfirmCreate, setShowConfirmCreate] = useState(false);
  const handleToggleConfirmCreate = () => setShowConfirmCreate(!showConfirmCreate);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/users",
        headers: { Authorization: `Bearer ${admin.token}` },
        data: {
          firstname: firstname,
          lastname: lastName,
          email: email,
          isAdmin: isAdmin,
          city: city,
          password: password,
        },
      });
      setShowConfirmCreate(!showConfirmCreate);
      if (status === 201) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="col">
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Users</h1>

                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Create User
                  </div>
                  <div className="card-body">
                    <Form
                      onSubmit={(ev) => {
                        ev.preventDefault();
                        setShowConfirmCreate(!showConfirmCreate);
                      }}
                    >
                      <div className="">
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={firstname}
                            onChange={(ev) => {
                              setFirstName(ev.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={lastName}
                            onChange={(ev) => {
                              setLastName(ev.target.value);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label me-3">Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(ev) => {
                            setEmail(ev.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3 w-100 me-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="text"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(ev) => {
                            setPassword(ev.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 w-100 me-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="ctiy"
                          id="city"
                          value={city}
                          onChange={(ev) => {
                            setCity(ev.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="form-label border rounded-3 p-2 mb-3 admin-switch">
                        <Form.Label className="m-0">Is Admin</Form.Label>

                        <Form.Check
                          inline={true}
                          className="ms-2"
                          type="switch"
                          name="isadmin"
                          id="isadmin"
                          onChange={(ev) => {
                            setIsAdmin(!isAdmin);
                          }}
                          checked={isAdmin}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                        <Button
                          variant="secondary"
                          className="me-3"
                          onClick={() => navigate("/users")}
                        >
                          Cancel
                        </Button>
                        <Button variant="success" onClick={handleToggleConfirmCreate}>
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* modal confirm changes */}
      <Modal show={showConfirmCreate} onHide={handleToggleConfirmCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create new user?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleToggleConfirmCreate}>
            No.
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Yes, i'm sure.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateUser;
