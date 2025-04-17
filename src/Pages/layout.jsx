import { useLocation } from "react-router-dom";
import Navbar from "../Components/NavbarComponent/Navbar";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";


  return (
    <>
      <Navbar isHomePage={isHomePage} />
    </>
  );
};

export default Layout;
