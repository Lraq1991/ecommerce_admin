import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import NewProduct from "./pages/NewProduct";
import UsersTable from "./pages/UsersTable";
import OrdersTable from "./pages/OrdersTable";
import CreateUser from "./pages/CreateUser";
import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="create-product" element={<NewProduct />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="categories" element={<Categories />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="orders" element={<OrdersTable />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
