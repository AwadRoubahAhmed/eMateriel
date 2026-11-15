import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
	// liens canoniques et image de partage doivent être absolus : l'adresse du site est fixée au build
	if (command === "build" && !loadEnv(mode, process.cwd(), "VITE_").VITE_SITE_URL) {
		console.warn("\n⚠ VITE_SITE_URL non défini : URL canoniques et og:image seront relatives (définir VITE_SITE_URL=https://votre-domaine avant npm run build)\n");
	}
	return {
		test: {
			// les tests utilisent toujours .env.test (base emateriel_test)
			env: loadEnv("test", process.cwd(), ""),
			// recrée la base de test avant la suite
			globalSetup: ["tests/global-setup.ts"],
			// une seule base partagée : les fichiers de test passent l'un après l'autre
			fileParallelism: false,
			include: ["tests/**/*.test.ts"],

			coverage: {
				exclude: ["node_modules", "server/index.ts"],
				// Inclure tous les fichiers TypeScript dans le dossier "server" pour les tests
				include: ["server/**/*.ts"],

				// Dossier d'exportaion de la couverture de code en HTML
				reportsDirectory: "tests/coverage",
			},
		},
		plugins: [
			rsc({
				// `entries` option is only a shorthand for specifying each `rollupOptions.input` below
				// > entries: { rsc, ssr, client },
				//
				// by default, the plugin setup request handler based on `default export` of `rsc` environment `rollupOptions.input.index`.
				// This can be disabled when setting up own server handler e.g. `@cloudflare/vite-plugin`.
				// > serverHandler: false
			}),

			// use any of react plugins https://github.com/vitejs/vite-plugin-react
			// to enable client component HMR
			react(),

			// use https://github.com/antfu-collective/vite-plugin-inspect
			// to understand internal transforms required for RSC.
			// import("vite-plugin-inspect").then(m => m.default()),
		],

		// specify entry point for each environment.
		// (currently the plugin assumes `rollupOptions.input.index` for some features.)
		environments: {
			// `rsc` environment loads modules with `react-server` condition.
			// this environment is responsible for:
			// - RSC stream serialization (React VDOM -> RSC stream)
			// - server functions handling
			rsc: {
				build: {
					rollupOptions: {
						input: {
							index: "./src/framework/entry.rsc.tsx",
						},
					},
				},
			},

			// `ssr` environment loads modules without `react-server` condition.
			// this environment is responsible for:
			// - RSC stream deserialization (RSC stream -> React VDOM)
			// - traditional SSR (React VDOM -> HTML string/stream)
			ssr: {
				build: {
					rollupOptions: {
						input: {
							index: "./src/framework/entry.ssr.tsx",
						},
					},
				},
			},

			// client environment is used for hydration and client-side rendering
			// this environment is responsible for:
			// - RSC stream deserialization (RSC stream -> React VDOM)
			// - traditional CSR (React VDOM -> Browser DOM tree mount/hydration)
			// - refetch and re-render RSC
			// - calling server functions
			client: {
				build: {
					rollupOptions: {
						input: {
							index: "./src/framework/entry.browser.tsx",
						},
					},
				},
			},
		},
	};
});
