// import React from 'react'
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Home from './pages/Home/Home'
// import Login from './pages/Login/Login'
// import SignUp from './pages/SignUp/SignUp'

// const routes =(
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />   
//       <Route path ="/dashboard" exact element={<Home />}></Route>
//       <Route path ="/login" exact element={<Login />}></Route>
//       <Route path ="/signup" exact element={<SignUp />}></Route>
//     </Routes>
//   </Router>
// )

// const App = () => {
//   return (
//     <div>
//      {routes}
//     </div>
//   )
// }

// export default App




// LATEST------------------------------------//

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import Home from "./pages/Home/Home"; // Dashboard/Home page

// // PrivateRoute component
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" replace />;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />

//         {/* Default route */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />

//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;