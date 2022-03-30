import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import "./FormLogin.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import userActions from "../redux/userActions";

function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { data: user } = await axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/users/adminlogin",
      data: {
        email: email,
        password: password,
      },
    });
    dispatch(userActions.userStorage(user));
    navigate("/");
  };

  return (
    <Form className="form-login" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          className="input-form-login rounded-pill"
          name="email"
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
          required
        />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          className="input-form-login rounded-pill"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-between align-items-center">
        <Button className="button-form-login rounded-pill btn-lg" variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/register" className="form-login-link-to-register">
          Register →
        </Link>
      </div>
    </Form>
  );
}

export default FormLogin;
