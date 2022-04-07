import { Table, Button, Modal, ModalBody } from "react-bootstrap";
import { format as formatDate } from "date-fns";
import "./UserTable.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function MyTable({ users, userDeleted, setUserDeleted, setShowForm, showForm, admin, setId }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const handleToggleConfirmDelete = () => setShowConfirmDelete(!showConfirmDelete);
  const [userToDelete, setUserToDelete] = useState({});
  const handleToDelete = async (user) => {
    setUserToDelete(user);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleDelete = async (user) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: process.env.REACT_APP_API_URL + "/users/" + user.id,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      if (status === 200) {
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
      setShowConfirmDelete(!showConfirmDelete);
      setUserDeleted(!userDeleted);
    } catch (error) {
      if (error) {
        toast.warning("This action is locked", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      {users && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>City</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "True" : "False"}</td>
                  <td>{user.city}</td>
                  <td>{formatDate(new Date(user.createdAt), "MMMM-dd-Y")}</td>
                  <td className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setId(user.id);
                        setShowForm(!showForm);
                      }}
                    >
                      <i className="fa-solid fa-user-pen"></i>
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleToDelete(user)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showConfirmDelete} onHide={handleToggleConfirmDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want delete this person?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <span className="user-table-info-modal-delete">Nombre:</span>{" "}
                {userToDelete.firstname} {userToDelete.lastname}
              </p>
              <p>
                <span className="user-table-info-modal-delete">City:</span> {userToDelete.city}
              </p>
              <p>
                <span className="user-table-info-modal-delete">Email:</span> {userToDelete.email}
              </p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button variant="secondary" onClick={handleToggleConfirmDelete}>
                No.
              </Button>
              <Button variant="primary" onClick={() => handleDelete(userToDelete)}>
                Yes, i'm sure.
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default MyTable;
