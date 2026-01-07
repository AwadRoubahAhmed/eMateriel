import "../assets/css/reset-css.css";
import "../assets/css/base.css";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<html lang="fr">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>eMatériel</title>
			</head>
			<body>
				{/* Outlet : zone remplie par un autre contenu */}
				<div className="container">
					<Outlet />
				</div>

				{/* <public_layout />  */}
			</body>
		</html>
	);
}
