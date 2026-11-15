import { data } from "react-router";
import NotFound from "./NotFound";

// adresse inconnue : statut HTTP 404 (et pas 200) pour les moteurs de recherche
export const loader = () => data(null, { status: 404 });

export default function ErrorPage() {
	return <NotFound />;
}
