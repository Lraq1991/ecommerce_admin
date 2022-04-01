import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";

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
          <div className="btn btn-success my-2">
            <Link to={"/create-category"} className="text-decoration-none text-white">
              New Category
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Picture</th>
                <th scope="col">Slug</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category) => (
                  <tr key={category.id}>
                    <th scope="row">
                      <img src={category.picture} alt={category.name} width={100} height={100} />
                    </th>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.picture}</td>
                    <td>{category.slug}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShow(category)}>
                        Not avaible
                      </Button>{" "}
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(category)}>
                        Remove
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        //<EditCategory setShow={setShow} category={category} getcategories={getCategories} />
        <div>hola</div>
      )}
    </div>
  );
}

export default Categories;
