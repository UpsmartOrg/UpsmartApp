export class OpenQuestion {
    constructor(
        public id: number,
        public survey_id: number,
        public title: string,
        public description: string,
        public rows: number,
        public question_number: number,
    ) { }
}
