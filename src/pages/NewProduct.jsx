import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function NewProduct() {
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
                  //placeholder={product.name}
                  //onChange={handleChange}
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
                  //placeholder={`${product.description.slice(0, 20)}...`}
                  //onChange={handleChange}
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
                  //placeholder={product.price}
                  //onChange={handleChange}
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
                  //placeholder={product.stock}
                  //onChange={handleChange}
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
                <Form.Control type="file" placeholder="{product.picture}" />
              </Col>
            </Form.Group>
          </Form.Group>
        </Form.Group>
        <Button variant="primary">Save</Button>
      </Form>
    </div>
  );
}

export default NewProduct;
