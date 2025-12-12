import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

function public_layout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}
export default public_layout;
