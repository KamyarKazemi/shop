import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Other from "./pages/other";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Other />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
