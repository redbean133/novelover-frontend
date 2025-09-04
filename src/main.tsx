import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./presentation/redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
