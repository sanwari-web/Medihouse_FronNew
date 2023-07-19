import { User } from "../user";

export interface Session {
    count: any;
    session_id:number;
    id:String;
    diagnosis:String;
    diagnosis_details:String;
    clinic_medicine:String;
    consultant_id:String;
    medical_operations:String;
    medical_reports:String;
    pharmacy_medicine:String;
    reason:String;
    date: Date;
    patient_id: User;
    consult_id: User;
}