import { Role } from "./role.model";

export class User {
    constructor(
        public id: number, 
        public first_name: string, 
        public last_name: string,
        public email: string, 
        public username: string,
        public role_id: number,
        public is_admin: boolean,
        public created_at: Date,

        //Optioneel
        public password?: string,
        public role?: { name: string }
    ) { }

}
