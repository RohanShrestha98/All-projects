import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ThemeProvider } from "./components/context/themeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    {/* <ThemeProvider> */}
    <App />
    {/* </ThemeProvider> */}
    {/* <ReactQueryDevtools position="bottom-right" /> */}
  </QueryClientProvider>
  // </React.StrictMode>
);
