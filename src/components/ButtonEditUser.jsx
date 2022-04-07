import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ButtonEditUser({ user }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const handleToggleConfirmEdit = () => setShowConfirmEdit(!showConfirmEdit);

  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [city, setCity] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const userToEdit = {
    firstname: firstname,
    lastname: lastName,
    email: email,
    isAdmin: isAdmin,
    city: city,
    createdAt: createdAt,
  };

  const handleSubmit = () => {};
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          setFirstName(user.firstname);
          setLastName(user.lastname);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
          setCity(user.city);
          setCreatedAt(user.createdAt);
          setShowModalEdit(!showModalEdit);
        }}
      >
        <i className="fa-solid fa-user-pen"></i>
      </Button>

      <Modal show={showModalEdit} onHide={() => setShowModalEdit(!showModalEdit)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label className="me-3">
              First Name
              <Form.Control
                id="firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={(ev) => {
                  setFirstName(ev.target.value);
                }}
              />
            </Form.Label>
            <Form.Label className="me-3">
              Last Name
              <Form.Control
                type="text"
                name="lastname"
                id="lastname"
                value={lastName}
                onChange={(ev) => {
                  setLastName(ev.target.value);
                }}
              />
            </Form.Label>
            <Form.Group className="mb-2">
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
            <Form.Label className="form-label me-3">
              Is Admin
              <Form.Check
                inline={true}
                className="ms-2"
                type="switch"
                name="isadmin"
                id="isadmin"
                onChange={(ev) => {
                  setIsAdmin(!isAdmin);
                }}
              />
            </Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEdit(!showModalEdit)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleToggleConfirmEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal confirm changes */}
      <Modal show={showConfirmEdit} onHide={handleToggleConfirmEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to save the changes?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleToggleConfirmEdit}>
            No.
          </Button>
          <Button variant="primary" onClick={handleToggleConfirmEdit}>
            Yes, i'm sure.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonEditUser;
