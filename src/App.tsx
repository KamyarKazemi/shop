import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/cartContext";
import Cart from "./components/Cart";
import store from "./redux/store";
import { fetchAllProducts } from "./redux/thunks/fetchAllProducts";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Cart />,
        path: "/cart",
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    store.dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
