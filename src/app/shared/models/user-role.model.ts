import { Role } from "./role.model";

export class UserRole {
    constructor(
        public user_id: number, 
        public role_id: number, 

        //Optioneel
        public id?: number,
        public role?: {
            name: string,
            //Optioneel
            id?: number,
        }
    ) { }
}
