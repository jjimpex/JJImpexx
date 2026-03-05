import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <ul style={{ marginTop: 20 }}>
        <li><Link to="/brands">View Brands List</Link></li>
        <li><Link to="/products">View Product List</Link></li>
        <li><Link to="/categories">View Category List</Link></li>
      </ul>
    </div>
  );
}