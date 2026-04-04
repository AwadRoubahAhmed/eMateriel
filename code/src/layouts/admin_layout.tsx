import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Guard from "../components/Guard";
import Navbar from "../components/navbar/Navbar";

export default function admin_layout() {
	return (
		<Guard roles={["Administrateur"]}>
			<Navbar />
			<Outlet />
			<Footer />
		</Guard>
	);
}
