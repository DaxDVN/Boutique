import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Auth from "./pages/auth/Auth.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import Product from "./pages/product/Product.jsx";
import NewProduct from "./pages/product/NewProduct.jsx";
import EditProduct from "./pages/product/EditProduct.jsx";
import Chat from "./pages/chat/Chat.jsx";

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path={"/products"} element={<Product />} />
            <Route path={"/product-new"} element={<NewProduct />} />
            <Route path={"/product-edit/:id"} element={<EditProduct />} />
            <Route path={"/chat"} element={<Chat />} />
          </Route>
          <Route path={"/auth"} element={<Auth />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
