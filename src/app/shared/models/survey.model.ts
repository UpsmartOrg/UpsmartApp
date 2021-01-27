export class Survey {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public description: string,
        public start_date: Date,
        public end_date: Date,
    ) { }
}
