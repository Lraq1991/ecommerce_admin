import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function NewProduct() {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    picture: "",
    stock: "",
    isStandout: false,
    slug: "",
  });
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(null);

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
    if (loaded) {
      try {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/products`,
          headers: { Authorization: `Bearer ${user.token}` },
          data: {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            picture: image,
            stock: formData.stock,
            isStandout: false,
            slug: formData.slug,
          },
        });
        notify();
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Must load an image before send this request");
    }
  };
  const uploadFile = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    if (!loaded) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/products/images`,
          headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "multipart/form-data" },
          data: form,
        });
        setImage(data.fileName);
        setLoaded(true);
        toast.success("Image saved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        setLoaded(null);
        toast.warning(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/products/${image}`,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setImage("");
      setLoaded(null);
    }
  };
  return (
    <div className="px-4 mx-4">
      <div className="col">
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Products</h1>
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Create Product
                  </div>
                  <div className="card-body">
                    <form className="px-4 mx-4" onSubmit={(e) => uploadFile(e)}>
                      <input className="form-control" name="image" type="file" />
                      <button className="btn btn-primary mt-3">
                        {!loaded ? "Load picture" : "Change picture"}
                      </button>
                    </form>
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
                                placeholder=""
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
                                placeholder=""
                                onChange={handleChange}
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
                                placeholder=""
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
                              <Form.Control
                                name="slug"
                                type="text"
                                placeholder=""
                                onChange={handleChange}
                              />
                            </Col>
                          </Form.Group>
                        </Form.Group>
                      </Form.Group>
                      <Link to={"/products"} className="btn btn-secondary my-4 me-4">
                        Back
                      </Link>
                      <Button variant="success m-4" onClick={() => handleClick()}>
                        Save
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

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

export default NewProduct;
