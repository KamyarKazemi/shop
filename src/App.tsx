import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import { lazy, Suspense, useEffect } from "react";
import { CartProvider } from "./contexts/cartContext";
import store from "./redux/store";
import { fetchAllProducts } from "./redux/thunks/fetchAllProducts";

import transition from "./framer/transition"; // <-- IMPORTANT

// Lazy load route components
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./components/Cart"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Profile = lazy(() => import("./pages/Profile"));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>{transition(Home)}</Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingFallback />}>{transition(Cart)}</Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            {transition(ProductPage)}
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            {transition(Profile)}
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    store.dispatch(fetchAllProducts());
  }, []);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
