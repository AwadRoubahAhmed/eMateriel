// Balises de référencement d'une page. React 19 les place automatiquement dans <head>.
type SeoProps = {
	title: string;
	description: string;
	path: string;
	// pages privées (compte, panier, admin…) : jamais indexées
	noindex?: boolean;
	image?: string;
};

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
const SITE_NAME = "eMatériel";

export default function Seo({ title, description, path, noindex, image }: SeoProps) {
	const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
	const url = `${SITE_URL}${path}`;
	const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/og-image.png`;

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			{noindex ? (
				<meta name="robots" content="noindex, nofollow" />
			) : (
				<link rel="canonical" href={url} />
			)}

			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:locale" content="fr_FR" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImage} />
		</>
	);
}
