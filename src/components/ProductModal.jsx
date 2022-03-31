import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function ProductModal({ show, handleClose, notify, product }) {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };
  const handleClick = async () => {
    try {
      console.log(formData);
      await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}/products/${product.slug}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
        },
      });
      notify();
      handleClose();
    } catch (err) {
      window.alert("Cant not make the update, try again later!");
    }
  };
  return (
    <>
      {product && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Form className="p-4">
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder={product.name}
                  onChange={handleChange}
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
                  placeholder={`${product.description.slice(0, 20)}...`}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="picture">
              <Form.Label column sm="2">
                Picture
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" placeholder={product.picture} />
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
                  placeholder={product.price}
                  onChange={handleChange}
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
                  placeholder={product.stock}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClick}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default ProductModal;
