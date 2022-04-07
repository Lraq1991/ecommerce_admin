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
    console.log(data, process.env.REACT_APP_IMAGES_URL);
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
          <div className="col">
            <div id="layoutSidenav">
              <div id="layoutSidenav_content">
                <main>
                  <div className="container-fluid px-4">
                    <h1 className="mt-4">Products</h1>

                    <div className="card mb-4">
                      <div className="card-header d-flex aling-items-center justify-content-between">
                        <div className="data-table-user">
                          <i className="fas fa-table me-1"></i>
                          Data Table Products
                        </div>
                        <Link to={"/create-product"} className="btn btn-outline-primary">
                          New Product
                        </Link>
                      </div>
                      <div className="card-body">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Price(usd)</th>
                              <th scope="col">Stock</th>
                              <th scope="col">Slug</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products &&
                              products.map((item) => (
                                <tr key={item.id}>
                                  <th scope="row">
                                    <img
                                      src={`${process.env.REACT_APP_IMAGES_URL}/${item.picture}`}
                                      alt={item.name}
                                      width={100}
                                      height={100}
                                    />
                                  </th>
                                  <td>{item.name}</td>
                                  <td>{item.description}</td>
                                  <td>{item.price}</td>
                                  <td>{item.stock}</td>
                                  <td>{item.slug}</td>
                                  <td>
                                    <Button variant="secondary" onClick={() => handleShow(item)}>
                                      <i className="fa-solid fa-user-pen"></i>
                                    </Button>{" "}
                                  </td>
                                  <td>
                                    <Button
                                      variant="outline-danger"
                                      onClick={() => handleRemove(item)}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Button>{" "}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col">
          <div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <main>
                <div className="container-fluid px-4">
                  <h1 className="mt-4">Products</h1>
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Edit Products
                    </div>
                    <div className="card-body">
                      <EditProduct setShow={setShow} product={product} getProducts={getProducts} />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
