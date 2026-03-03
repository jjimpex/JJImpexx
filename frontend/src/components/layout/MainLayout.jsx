import Navbar from "../layout/Header";
import Footer from "../layout/Footer";
import "../../styles/mainLayout.css";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}