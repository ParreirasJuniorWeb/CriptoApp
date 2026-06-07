// import React-router-dom router (match routes);
import router from "./routes";
import { RouterProvider } from "react-router-dom";

import ErrorBoundaryComponent from "./components/ErrorBoundary/ErrorBoundary";

// import CSS file
import './App.css';

const App = () => {
  return (
    <div className="App">
      <ErrorBoundaryComponent>
        <RouterProvider router={router} />
      </ErrorBoundaryComponent>
    </div>
  );
};

export default App;