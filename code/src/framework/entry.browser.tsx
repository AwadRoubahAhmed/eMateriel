import {
	createFromReadableStream,
	createTemporaryReferenceSet,
	encodeReply,
	setServerCallback,
} from "@vitejs/plugin-rsc/browser";
import { StrictMode, startTransition } from "react";
import { hydrateRoot, type ReactFormState } from "react-dom/client";
import {
	unstable_createCallServer as createCallServer,
	unstable_getRSCStream as getRSCStream,
	unstable_RSCHydratedRouter as RSCHydratedRouter,
	type unstable_RSCPayload as RSCServerPayload,
} from "react-router/dom";

// Après un redéploiement, un onglet resté ouvert demande d'anciens fichiers (supprimés) :
// on recharge la page pour récupérer la nouvelle version, une seule fois pour éviter une boucle.
window.addEventListener("vite:preloadError", (event) => {
	const key = "ematériel.reloaded-at";
	if (Date.now() - Number(sessionStorage.getItem(key) ?? 0) > 10_000) {
		event.preventDefault();
		sessionStorage.setItem(key, String(Date.now()));
		window.location.reload();
	}
});

// Create and set the callServer function to support post-hydration server actions.
setServerCallback(
	createCallServer({
		createFromReadableStream,
		createTemporaryReferenceSet,
		encodeReply,
	}),
);

// Get and decode the initial server payload.
createFromReadableStream<RSCServerPayload>(getRSCStream()).then((payload) => {
	startTransition(async () => {
		const formState =
			payload.type === "render" ? ((await payload.formState) as ReactFormState | undefined) : undefined;

		hydrateRoot(
			document,
			<StrictMode>
				<RSCHydratedRouter
					createFromReadableStream={createFromReadableStream}
					payload={payload}
				/>
			</StrictMode>,
			{
				formState,
			},
		);
	});
});
