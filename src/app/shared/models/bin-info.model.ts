export class BinInfo {
    constructor(
        public id: number,
        public name: string,
        public bin_id: number,

        //Optional
        public zone_id?: number,
        public address?: string,
        public zone?: { name: string },
        public longitude?: number,
        public latitude?: number,
    ) { }
}
