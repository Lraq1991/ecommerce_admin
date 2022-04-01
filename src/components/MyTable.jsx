import { Table, Button } from "react-bootstrap";
import { format as formatDate } from "date-fns";
import "./MyTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyTable({ users, userDeleted, setUserDeleted, setShowForm, showForm, admin, setId }) {
  const handleDelete = async (user) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: process.env.REACT_APP_API_URL + "/users/" + user.id,
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setUserDeleted(!userDeleted);
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
                    <Button variant="outline-danger" onClick={() => handleDelete(user)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default MyTable;
