export class Alert {
    id!: string;
    type!: AlertType;
    messageTitle!: string;
    messageBody!: string;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}