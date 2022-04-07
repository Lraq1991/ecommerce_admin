import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory({ category, setShow, getCategories }) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [slug, setSlug] = useState(category.slug);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Succesfully updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleClick = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}/categories/${category.slug}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name: name,
          description: description,
          slug: slug,
        },
      });
      notify();
      getCategories();
    } catch (err) {
      window.alert("Cant not make the update, try again later!");
    }
  };
  const handleBack = () => {
    navigate("/categories");
    setShow(false);
  };
  return (
    <div className="px-4 mx-4">
      <Form className="p-4 m-4">
        <Form.Group as={Row}>
          <Form.Group as={Col}>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="stock">
              <Form.Label column sm="2">
                Slug
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form.Group>
        </Form.Group>
        <Button variant="secondary me-4" onClick={handleBack}>
          Cancel
        </Button>
        <Button variant="success m-4" onClick={() => handleClick()}>
          Save Changes
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

export default EditCategory;
