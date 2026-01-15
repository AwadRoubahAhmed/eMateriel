import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function admin_layout() {
  return (
      <>
          <Navbar />
          <Outlet />
          <Footer />
      
      </>
  )
}
