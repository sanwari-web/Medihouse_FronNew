import { User } from "../user";

export interface Appointment {
    id: number;
    note:String;
    patient: User;
    user: User;
    date: Date;
    time: Date;
}
