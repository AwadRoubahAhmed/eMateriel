import type { User } from "../../models/user";
import type { ApiResponse } from "../models/api_response";


class SecurityAPiService {
    // préfixe de l'api
    private prefix = "/api";

    //sélection de tous les enregistrement
    public register = async (data:Partial<User>): Promise<ApiResponse<User>> => {
        // configurer la requete HTTP
        // import.meta.env permet d'importer uen varaiable d'environnement dans vit/react
        const request = new Request(
            `${import.meta.env.VITE_API_URL}${this.prefix}/register`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",

                },
                body: JSON.stringify (data),
            }
        );
        // exécuter la requéte HTTP
        const response = await fetch(request);
        //convertir la réponse en JSON
        // sérialiser : convertir des donne complexes (objet,arry) en chain de caraceters
        // désérialiser convertir une chaine de caracters en donnees complexes :objet,arry....
        const results = await response.json();
        // retourner les resultats
        return results;
    };

    public login = async (data:Partial<User>): Promise<ApiResponse<string>> => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}${this.prefix}/login`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",

                },
                body: JSON.stringify (data),
            }
        );
        const response = await fetch(request);
       
        const results = await response.json();

        return results;                                                                                     
    };                                                                                                              
}
export default SecurityAPiService;