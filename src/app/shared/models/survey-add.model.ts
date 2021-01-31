import { MultiplechoiceQuestionAdd } from "./multiplechoice-question-add.model";
import { OpenQuestionAdd } from "./open-question-add.model";

export class SurveyAdd {
    constructor(
        public user_id: number,
        public name: string,
        public description: string,
        public start_date: Date,
        public end_date: Date,
        public open_questions: OpenQuestionAdd[],
        public multiplechoice_questions: MultiplechoiceQuestionAdd[],

        //Optional
        public id?: number,
    ) { }
}
