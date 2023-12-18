import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Toaster } from "react-hot-toast";
import store from "./redux-toolkit/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster
      toastOptions={{
        style: {
          background: "rgb(51 65 85)",
          color: "#fff",
          fontSize: "14px",
        },
        success: { duration: 4000 },
      }}
    />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
