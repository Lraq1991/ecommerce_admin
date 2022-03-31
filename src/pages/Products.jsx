import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ProductModal from "../components/ProductModal";

function Products() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setProduct(item);
    setShow(true);
  };

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:8000/products");

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
      <ProductModal show={show} handleClose={handleClose} product={product} />
    </div>
  );
}

export default Products;
