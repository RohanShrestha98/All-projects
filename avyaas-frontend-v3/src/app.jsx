import React from "react";
import RouteController from "./routes/routeController";

const App = () => {
  return (
    <div id="main" className={`min-h-screen w-full`}>
      <RouteController />
    </div>
  );
};

export default App;
