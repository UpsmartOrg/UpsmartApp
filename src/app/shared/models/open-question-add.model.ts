export class OpenQuestionAdd {
    constructor(
        public survey_id: number,
        public title: string,
        public description: string,
        public rows: number,
        public question_order: number,
        
        //Optional
        public id?: number,
    ) { }
}
