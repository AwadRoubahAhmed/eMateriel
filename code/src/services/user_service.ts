import type { User } from "../../models/user";

class UserService { 
    private static user: User | null; 

    public setUser = (user: User | null) => { 
       // la méthode doit être exécutée côté serveur 
       "use server"; 
        UserService.user = user; 
    }; 

    public getUser = (): User | null => { 
        // la méthode doit être exécutée côté serveur 
        "use server"; 
        return UserService.user; 
     }

}; 
export default UserService;