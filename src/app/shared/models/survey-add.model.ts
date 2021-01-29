import { MultiplechoiceQuestion } from "./multiplechoice-question.model";
import { OpenQuestion } from "./open-question.model";

export class SurveyAdd {
    constructor(
        public user_id: number,
        public name: string,
        public description: string,
        public start_date: Date,
        public end_date: Date,
        public open_questions: OpenQuestion[],
        public multiplechoice_questions: MultiplechoiceQuestion[],

        //Optional
        public id?: number,
    ) { }
}
