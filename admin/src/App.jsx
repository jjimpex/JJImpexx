// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Brands from "./pages/Brands";
// import Categories from "./pages/Categories";
// import Products from "./pages/Products";

// import MainLayout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import "./styles/global.css";

// export default function App() {
//   return (
//     <Routes>

//       {/* PUBLIC ROUTE */}
//       <Route path="/login" element={<Login />} />

//       {/* PROTECTED ROUTES */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/brands" element={<Brands />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/products" element={<Products />} />
//       </Route>

//       {/* DEFAULT REDIRECT */}
//       <Route path="*" element={<Navigate to="/login" />} />

//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

import MainLayout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/global.css";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED LAYOUT */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />

      </Route>

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}