import "./FormEditUser.css";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { format as formatDate } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function FormEditUser({ admin, showForm, setShowForm, id }) {
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const handleToggleConfirmEdit = () => setShowConfirmEdit(!showConfirmEdit);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [city, setCity] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios({
          method: "GET",
          url: process.env.REACT_APP_API_URL + "/users/" + id,
          headers: { Authorization: `Bearer ${admin.token}` },
        });

        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setCity(data.city);
        setCreatedAt(formatDate(new Date(data.createdAt), "yyyy-MM-dd"));
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async () => {
    try {
      const { data, status } = await axios({
        method: "PATCH",
        url: process.env.REACT_APP_API_URL + "/users/" + id,
        headers: { Authorization: `Bearer ${admin.token}` },
        data: {
          firstname: firstname,
          lastname: lastName,
          email: email,
          isAdmin: isAdmin,
          city: city,
          createdAt: createdAt,
        },
      });
      setShowConfirmEdit(!showConfirmEdit);
      if (status === 206) {
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
      setShowForm(!showForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
        <div className="d-lg-flex  ">
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

          <Form.Group className="mb-3 w-100">
            <Form.Label>Ceated at</Form.Label>
            <Form.Control
              type="date"
              name="createdAt"
              id="createdAt"
              value={createdAt}
              readOnly={true}
            ></Form.Control>
          </Form.Group>
        </div>
        <Form.Group className="form-label border rounded-3 p-2 mb-3 admin-switch">
          <Form.Label className="m-0">Is Admin</Form.Label>
          {id === 1 ? (
            <Form.Check
              inline={true}
              className="ms-2"
              type="switch"
              name="isadmin"
              id="isadmin"
              onChange={(ev) => {
                return false;
              }}
              checked={isAdmin}
            />
          ) : (
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
          )}
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="secondary" className="me-3" onClick={() => setShowForm(!showForm)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleToggleConfirmEdit}>
            Save Changes
          </Button>
        </div>
      </Form>

      {/* modal confirm changes */}
      <Modal show={showConfirmEdit} onHide={handleToggleConfirmEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to save the changes?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleToggleConfirmEdit}>
            No.
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Yes, i'm sure.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEditUser;
