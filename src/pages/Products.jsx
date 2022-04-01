import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import EditProduct from "../components/EditProduct";

function Products() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);

  const handleShow = (item) => {
    setProduct(item);
    setShow(true);
  };

  const getProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);

    setProducts(data);
  };

  const handleRemove = async (item) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/products/${item.slug}`,
      headers: { Authorization: `Bearer ${user.token}` },
    });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {!show ? (
        <>
          <div className="btn btn-success my-2">
            <Link to={"/create-product"} className="text-decoration-none text-white">
              New Product
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price(usd)</th>
                <th scope="col">Stock</th>
                <th scope="col">Slug</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
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
                    <td>{item.slug}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShow(item)}>
                        Edit
                      </Button>{" "}
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(item)}>
                        Remove
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <EditProduct setShow={setShow} product={product} getProducts={getProducts} />
      )}
    </div>
  );
}

export default Products;
