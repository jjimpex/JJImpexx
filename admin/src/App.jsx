// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Brands from "./pages/Brands";
// import Categories from "./pages/Categories";
// import MainLayout from "../src/components/Layout";
// import "./styles/global.css";

// export default function App() {
//   return (
//     <Routes>

//       {/* Pages with header + footer */}
//       <Route element={<MainLayout />}>

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/brands" element={<Brands />} />
//         <Route path="/categories" element={<Categories />} />

      

//       {/* Login page without header/footer */}
//       <Route path="/login" element={<Login />} />

//       <Route path="*" element={<Navigate to="/login" />} />
// </Route>
//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import MainLayout from "./components/Layout";
import "./styles/global.css";
import Products from "./pages/Products";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}