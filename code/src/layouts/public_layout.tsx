import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

export { default as ErrorBoundary } from "../pages/error/RouteError";

export default function PublicLayout() {
	return (
		<>
			<Navbar />
			<main id="main-content" className="shell">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
