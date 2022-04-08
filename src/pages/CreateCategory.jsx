import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function CreateCategory() {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    picture: "",
    slug: "",
  });

  const notify = () =>
    toast.success("Succesfully created!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };
  const handleClick = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/categories`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name: formData.name,
          description: formData.description,
          picture: formData.picture,
          slug: formData.slug,
        },
      });
      notify();
    } catch (err) {
      window.alert("Cant not make this action, try again later!");
    }
  };

  return (
    <div className="px-4 mx-4">
      <Form className="p-4 m-4">
        <Link to={"/categories"} className=" btn btn-dark my-4">
          Back
        </Link>
        <Form.Group as={Row}>
          <Form.Group as={Col}>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control name="name" type="text" placeholder="" onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="description">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="description"
                  placeholder=""
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="slug">
              <Form.Label column sm="2">
                Slug
              </Form.Label>
              <Col sm="10">
                <Form.Control name="name" type="text" placeholder="" onChange={handleChange} />
              </Col>
            </Form.Group>
          </Form.Group>
        </Form.Group>
        <Button variant="primary" onClick={() => handleClick()}>
          Save
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default CreateCategory;
