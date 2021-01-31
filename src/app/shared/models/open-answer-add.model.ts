export class OpenAnswerAdd {
    constructor(
        public survey_id: number,
        public open_question_id: number,
        public open_question_answer: string
    ) { }
}
