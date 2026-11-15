import "../assets/css/reset-css.css";
import "../assets/css/base.css";
import { Outlet } from "react-router-dom";
import CookieConsent from "../components/cookies/CookieConsent";

export default function RootLayout() {
	return (
		<html lang="fr">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#1d4ed8" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</head>
			<body>
				<a href="#main-content" className="skipLink">
					Aller au contenu principal
				</a>
				<div className="container">
					<Outlet />
				</div>
				<CookieConsent />
			</body>
		</html>
	);
}
