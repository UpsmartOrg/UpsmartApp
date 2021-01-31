export class OpenAnswerAdd {
    constructor(
        public conducted_survey_id: number,
        public open_question_id: number,
        public open_question_answer: string
    ) { }
}
