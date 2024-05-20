import Footer from "components/Footer";
import NavBar from "components/NavBar";
import "styles/MainLayout.css";

const MainLayout = ({ children, fullScreen = false }) => {
  return (
    <div className={`layout-container ${fullScreen ? "full-screen" : ""}`}>
      <NavBar />
      <main className="main-bg">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
