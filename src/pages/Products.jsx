import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ProductModal from "../components/ProductModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setProduct(item);
    setShow(true);
  };

  const getProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);

    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price(usd)</th>
            <th scope="col">Stock</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <img src={item.picture} alt={item.name} width={100} height={100} />
                </th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>get status</td>
                <td>
                  <Button variant="secondary" onClick={() => handleShow(item)}>
                    Edit
                  </Button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ProductModal show={show} handleClose={handleClose} notify={notify} product={product} />
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

export default Products;
