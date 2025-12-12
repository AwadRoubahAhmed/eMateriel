import type { SeoProps } from "../models/props/seo_props";

export default function Seo({ title, description, url }: SeoProps) {
	return (
		<>
			<title>{`eMatériel - ${title}`}</title>
			<meta name="description" content={`eMatériel - ${description}`} />

			{/* <!-- Your content's social media identity - Open Graph     --> */}
			<meta property="og:title" content={`eMatériel - ${title}`} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`http://eMatériel.com${url}`} />
			{/*  image : 1200 * 630 px */}
			<meta
				property="og:image"
				content="http://eMatériel.com/img/og_banner.png"
			/>
			<meta property="og:description" content={`eMatériel - ${description}`} />

			{/* Twitter Cards */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@yourusername" />
			<meta name="twitter:title" content={`eMatériel - ${title}`} />
			<meta name="twitter:description" content={`eMatériel - ${description}`} />
			{/* image : plutot carrée - use square image */}
			<meta
				name="twitter:image"
				content="http://eMatériel.com/img/twitter_card.png"
			/>
		</>
	);
}
