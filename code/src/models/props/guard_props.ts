import type React from "react";

type GuardProps = {
	roles: string[];
	//children permet de definir le composant poseder d'autres enfants
	children: React.JSX.Element | React.JSX.Element[];
};

export type { GuardProps };
