import { Role } from "./role.model";
import { UserRole } from "./user-role.model";

export class User {
    constructor(
        public id: number, 
        public first_name: string, 
        public last_name: string,
        public email: string, 
        public username: string,
        public is_extern: boolean,
        public created_at: Date,

        //Optioneel
        public password?: string,
        public user_roles?: UserRole[]
    ) { }
    
}
