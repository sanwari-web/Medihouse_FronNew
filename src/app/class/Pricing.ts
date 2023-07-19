import { Session } from "./Session";
import { User } from "../user";

export interface Pricing {
    pricing_id: number;
    consultation_fees:String;
    medication_fees:String;
    total_bill:number;
    patient_id: User;
    session_id: Session;
    consulta_id: User;
    date: Date;
}
