import { User } from "./user.model";

export class Survey {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public description: string,
        public start_date: Date,
        public end_date: Date,
        public user: User,
        public created_at: Date,
        public quick_survey?: boolean,
    ) { }
}
