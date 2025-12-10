import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

class RouterService {
	public getRouter = () => {
		return [
			{
				//identifiant unique de la route
				id: "root",
				//prefixe des routes
				path: "/",
				//importation de la mise en page parente;
				lazy: () => import("../layouts/root_layout"),
				children: [
					{
						id: "home",
						index: true,
						path: "",
						lazy: () => import("../pages/Home"),
					},
					{
						id: "contact",
						path: "/contact",
						lazy: () => import("../pages/Contact"),
					},
				],
			},
		] satisfies RSCRouteConfig;
	};
}

export default RouterService;
