import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import EditCategory from "../components/EditCategory";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);

  const handleShow = (category) => {
    setCategory(category);
    setShow(true);
  };

  const getCategories = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);

    setCategories(data);
  };

  const handleRemove = async (category) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/categories/${category.slug}`,
      headers: { Authorization: `Bearer ${user.token}` },
    });
    getCategories();
  };

  useEffect(() => {
    getCategories();
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
                    <h1 className="mt-4">Categories</h1>

                    <div className="card mb-4">
                      <div className="card-header d-flex aling-items-center justify-content-between">
                        <div className="data-table-user">
                          <i className="fas fa-table me-1"></i>
                          Data Table Categories
                        </div>
                        <Link to={"/create-category"} className="btn btn-outline-primary">
                          New Category
                        </Link>
                      </div>
                      <div className="card-body">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Picture</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Slug</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories &&
                              categories.map((category) => (
                                <tr key={category.id}>
                                  <th scope="row">
                                    <img
                                      src={category.picture}
                                      alt={category.name}
                                      width={100}
                                      height={100}
                                    />
                                  </th>
                                  <td>{category.name}</td>
                                  <td>{category.description}</td>
                                  <td>{category.slug}</td>
                                  <td>
                                    <Button
                                      variant="secondary"
                                      onClick={() => handleShow(category)}
                                    >
                                      <i className="fa-solid fa-user-pen"></i>
                                    </Button>{" "}
                                  </td>
                                  <td>
                                    <Button
                                      variant="outline-danger"
                                      onClick={() => handleRemove(category)}
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
                  <h1 className="mt-4">Categories</h1>
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Edit Categories
                    </div>
                    <div className="card-body">
                      <EditCategory
                        setShow={setShow}
                        category={category}
                        getCategories={getCategories}
                      />
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

export default Categories;
