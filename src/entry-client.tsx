import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  // Hydrate the existing SSR markup
  hydrateRoot(
    rootElement,
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  // Fallback for CSR-only rendering
  console.warn("Root element is empty. No SSR content found.");
}
