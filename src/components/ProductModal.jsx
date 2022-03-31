import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

function ProductModal({ show, handleClose, notify, product }) {
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
                <Form.Control type="text" placeholder={product.name} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="description">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder={`${product.description.slice(0, 20)}...`} />
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
                <Form.Control type="number" placeholder={product.price} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="stock">
              <Form.Label column sm="2">
                Stock
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number" placeholder={product.stock} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="status">
              <Form.Label column sm="2">
                Status
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="get status!!" />
              </Col>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={notify}>
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
