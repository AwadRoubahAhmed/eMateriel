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
						id: "public",
						path: "",
						lazy: () => import("../layouts/public_layout"),
						children: [
							{
								id: "home",
								index: true,
								path: "",
								lazy: () => import("../pages/Homepage"),
							},
							{
								id: "products",
								path: "products",
								lazy: () => import("../pages/products/Products"),
							},
							{
								id: "products_detail",
								path: "products/:id",
								lazy: () => import("../pages/products/ProductsDetail"),
							},
							{
								id: "contact",
								path: "contact",
								lazy: () => import("../pages/contact/Contact"),
							},
							{
								id: "apropos",
								path: "apropos",
								lazy: () => import("../pages/apropos/Apropos"),
							},
							{
								id: "panier",
								path: "panier",
								lazy: () => import("../pages/panier/Panier"),
							},
							{
								id: "auth",
								path: "auth",
								lazy: () => import("../pages/auth/AuthPage/AuthPage"),
							},
							{
								id: "logout",
								path: "logout",
								lazy: () => import("../pages/Logout"),
							},
							{
								id: "conditions_generales",
								path: "condition_generale",
								lazy: () =>
									import("../pages/ConditionsGenerales/ConditionsGenerales"),
							},
							{
								id: "politique_confidentialite",
								path: "Politique_Confidentialite",
								lazy: () =>
									import(
										"../pages/PolitiqueConfidentialite/PolitiqueConfidentialite"
									),
							},
							{
								id: "faqs",
								path: "FAQs",
								lazy: () => import("../pages/FAQs/FAQs"),
							},
							{
								id: "Error",
								path: "*",
								lazy: () => import("../pages/error/Error"),
							},
						],
					},
					{
						id: "admin",
						path: "/admin",
						lazy: () => import("../layouts/admin_layout"),
						children: [
							{
								id: "admin-home",
								path: "dashboard",
								lazy: () => import("../pages/admin/index"),
							},
							{
								id: "admin-product-home",
								path: "products",
								lazy: () => import("../pages/admin/product/index"),
							},
							{
								id: "admin-product-form",
								path: "product/form/:id?",
								lazy: () => import("../pages/admin/product/form"),
							},
						],
					},
				],

				// children: [
				// 	{
				// 		id: "home",
				// 		index: true,
				// 		path: "",
				// 		lazy: () => import("../pages/Homepage"),
				// 	},
				// 	{
				// 		id: "products",
				// 		path: "/products",
				// 		lazy: () => import("../pages/products/Products"),
				// 	},
				// 	{
				// 		id: "products_detail",
				// 		path: "/products/:id",
				// 		lazy: () => import("../pages/products/ProductsDetail"),
				// 	},
				// 	{
				// 		id: "contact",
				// 		path: "/contact",
				// 		lazy: () => import("../pages/contact/Contact"),
				// 	},
				// 	{
				// 		id: "apropos",
				// 		path: "/apropos",
				// 		lazy: () => import("../pages/apropos/Apropos"),
				// 	},
				// 	{
				// 		id: "panier",
				// 		path: "/panier",
				// 		lazy: () => import("../pages/panier/Panier"),
				// 	},
				// 	{
				// 		id: "connection",
				// 		path: "/connection",
				// 		lazy: () => import("../pages/connection/Connection"),
				// 	},
				// 	{
				// 		id: "Error",
				// 		path: "*",
				// 		lazy: () => import("../pages/error/Error"),
				// 	},
				// 	{
				// 		id: "admin-home",
				// 		path: "/admin",
				// 		lazy: () => import("../pages/admin/index"),
				// 	},
				// 	{
				// 		id: "admin-product-home",
				// 		path: "/admin/products",
				// 		lazy: () => import("../pages/admin/product/index"),
				// 	},
				// 	{
				// 		id: "admin-product-form",
				// 		path: "/admin/products/form/:id?",
				// 		lazy: () => import("../pages/admin/product/form"),
				// 	},

				// 	// {
				// 	// 	id: "public_layaout",
				// 	// 	path: "/",
				// 	// 	lazy: () => import("../layouts/public_layout"),
				// 	// 	children: [
				// 	// 		{
				// 	// 			id: "home",
				// 	// 			index: true,
				// 	// 			path: "",
				// 	// 			lazy: () => import("../pages/Homepage"),
				// 	// 		},
				// 	// 		{
				// 	// 			id: "contact",
				// 	// 			path: "/contact",
				// 	// 			lazy: () => import("../pages/Contact"),
				// 	// 		},
				// 	// 	],
				// 	// },
				// ],
			},
		] satisfies RSCRouteConfig;
	};
}

export default RouterService;
