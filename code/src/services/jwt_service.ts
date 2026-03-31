import * as jose from "jose"; 
import type { User } from "../../models/user";


class JwtService { 
// propriété statique, afin de ne pas instancier un nouvel objet à chaque appel des méthodes 
private static token: string; 
public setToken = async (user: User | null): Promise<void> => { 
// la méthode doit être exécutée côté serveur 
"use server"; 
if (user) { 
JwtService.token = await new jose.SignJWT(user) 
.setProtectedHeader({ alg: "HS256" }) 
.setExpirationTime("5m") // délai d'expiration de 5 minutes 
// .setExpirationTime("10h") // délai d'expiration de 10 heures 
.sign(new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET)); 
} 
}; 
public getToken = async (): Promise<string> => { 
// la méthode doit être exécutée côté serveur 
"use server"; 
return JwtService.token; 
}; 
} 

export default JwtService;