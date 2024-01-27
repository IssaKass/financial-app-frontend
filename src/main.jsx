import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./app/store.js";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider
      themeStorageKey="financial-ui-theme"
      colorModeStorageKey="financial-ui-color-mode"
    >
      <App />
    </ThemeProvider>
  </Provider>,
);
