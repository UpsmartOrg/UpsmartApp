import { Timestamp } from "rxjs/internal/operators/timestamp";
import { User } from "./user.model";

export class Message {
    constructor(
        public id: number,
        public userId: number,
        public title: string,
        public body: string,
        public user: User,
        public created_at?: Date,
    ) { }
}
