import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct({ product, setShow, getProducts }) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [slug, setSlug] = useState(product.slug);
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
        url: `${process.env.REACT_APP_API_URL}/products/${product.slug}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name: name,
          description: description,
          price: price,
          stock: stock,
          slug: slug,
        },
      });
      notify();
      getProducts();
    } catch (err) {
      window.alert("Cant not make the update, try again later!");
    }
  };
  const handleBack = () => {
    navigate("/products");
    setShow(false);
  };
  return (
    <div className="px-4 mx-4">
      <Form className="p-4 m-4">
        <div className=" btn btn-dark my-4" onClick={handleBack}>
          Back
        </div>
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
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="stock">
              <Form.Label column sm="2">
                Stock
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
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
          <Form.Group as={Col} className="ps-5 ms-5">
            <Form.Group as={Row} className="mb-3" controlId="picture">
              <Form.Label column sm="2">
                Picture
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" />
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

export default EditProduct;
