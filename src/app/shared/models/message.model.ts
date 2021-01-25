import { Timestamp } from "rxjs/internal/operators/timestamp";
import { User } from "./user.model";

export class Message {
    constructor(
        public id: number,
        public userId: number,
        public title: string,
        public body: string,
        public created_by: number,
        public created_at: Date,
        public user: User
    ) { }
}
