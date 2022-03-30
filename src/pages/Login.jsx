import "./Login.css";
import { Container } from "react-bootstrap";
// import NavBar from "../components/Navbar";
// import Footer from "../components/Footer";
import FormLogin from "../components/FormLogin";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <Container className="p-0 m-0 mw-100 height-100-percent-page">
      {/* <Row className="w-100 m-0 px-5 py-3 ">
        <NavBar />
      </Row> */}
      <div className="login-main-page">
        <FormLogin />
      </div>
      {/* <Footer /> */}
    </Container>
  );
}

export default Login;
