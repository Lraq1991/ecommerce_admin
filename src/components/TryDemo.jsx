import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userActions from "../redux/userActions";

function TryDemo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const { data: user } = await axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/users/adminlogin",
      data: {
        email: "admin@admin.com",
        password: "admin",
      },
    });
    dispatch(userActions.userStorage(user));
    navigate("/");
  };

  return (
    <div>
      <Button
        className="rounded-pill btn-lg my-5 w-100"
        variant="dark"
        onClick={() => handleClick()}
      >
        Try Demo
      </Button>
    </div>
  );
}

export default TryDemo;
