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
						lazy: () => import("../pages/Homepage"),
					},
					{
						id: "products",
						path: "/products",
						lazy: () => import("../pages/products/Products"),
					},
					{
						id: "contact",
						path: "/contact",
						lazy: () => import("../pages/contact/Contact"),
					},
					{
						id: "apropos",
						path: "/apropos",
						lazy: () => import("../pages/apropos/Apropos"),
					},
					{
						id: "panier",
						path: "/panier",
						lazy: () => import("../pages/panier/Panier"),
					},
					{
						id: "connection",
						path: "/connection",
						lazy: () => import("../pages/connection/Connection"),
					},

					// {
					// 	id: "public_layaout",
					// 	path: "/",
					// 	lazy: () => import("../layouts/public_layout"),
					// 	children: [
					// 		{
					// 			id: "home",
					// 			index: true,
					// 			path: "",
					// 			lazy: () => import("../pages/Homepage"),
					// 		},
					// 		{
					// 			id: "contact",
					// 			path: "/contact",
					// 			lazy: () => import("../pages/Contact"),
					// 		},
					// 	],
					// },
				],
			},
		] satisfies RSCRouteConfig;
	};
}

export default RouterService;
