import { MultiplechoiceItemAdd } from "./multiplechoice-item-add.model";

export class MultiplechoiceQuestionAdd {
    constructor(
        public survey_id: number,
        public title: string,
        public description: string,
        public multiple_answers: boolean,
        public question_order: number,
        public multiplechoice_items: MultiplechoiceItemAdd[],

        //Optional
        public id?: number,
    ) { }
}
