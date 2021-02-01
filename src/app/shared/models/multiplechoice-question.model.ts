import { MultiplechoiceItem } from "./multiplechoice-item.model";

export class MultiplechoiceQuestion {
    constructor(
        public id: number,
        public survey_id: number,
        public title: string,
        public description: string,
        public multiple_answers: boolean,
        public question_order: number,
        public multiplechoice_items: MultiplechoiceItem[],
    ) { }
}
