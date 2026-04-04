import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecurityService from "../services/security_service";

const Logout = (): React.JSX.Element => {
	// useNavigate permet de créer une redirection
	const navigate = useNavigate();

	//supprimer l'utilisateur à l'affichage du composant/page

	useEffect(() => {
		new SecurityService().logout();
		// Redirection vers l'accueil
		navigate("/");
	}, [navigate]);

	return <></>;
};

export default Logout;
