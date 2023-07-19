import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pricing } from './class/Pricing';
import { Session } from './class/Session';
import { User } from './user';
import { Appointment } from './class/Appointment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
 
  
  baseUrl = "http://localhost:9090";
  contextPath = "api";
  
  constructor(private http: HttpClient) { 
    this.baseUrl += '/'+ this.contextPath;
  }
 
  getHeaders(){
   let auth:any =localStorage.getItem('token')? localStorage.getItem('token'): null;
  const headers = new HttpHeaders({
    'Content-type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Conrol-Allow-Credentials':'true',
    'Access-Control-Allow-Header':'Access-Control-Allow-Headers,Origin,Accept,x-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Header',
    'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT,PATCH',
    'Authorization': "Bearer " + auth
  })
}
  public getUserByEmail(email: string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/find/email/${email}`);
  }
  public getUserByUserEmail(email: string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/find/emailid/${email}`);
  }
  public getConsultants():Observable<User[]>{

    return this.http.get<User[]>(`${this.baseUrl}/user/find/doctor`);
  }
 
  public getConsultantsById(id : number):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/find/${id}`);
  }
 
 public createUser(user : User): Observable<User>{
      
    return this.http.post<User>(`${this.baseUrl}/user/add`, user);
  }

  public updateUser(user : User): Observable<User>{
    
    return this.http.post<User>(`${this.baseUrl}/user/update `, user);
  }

  public changepassword(user : any): Observable<User>{
    
    return this.http.post<User>(`${this.baseUrl}/user/change/password`,user);
  }

  public deleteUser(id : number): Observable<void>{
    
    return this.http.delete<void>(`${this.baseUrl}/user/delete/${id}`);
  }

  public getPatient():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/find/patient`);
  }
  public createAppointment(appointment : Appointment): Observable<Appointment>{
    
    return this.http.post<Appointment>(`${this.baseUrl}/appointment/add`, appointment);
  }
  public getAppointment():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointment/find`);
  }

  public updateAppointment(appointment : Appointment): Observable<Appointment>{
    
    return this.http.post<Appointment>(`${this.baseUrl}/appointment/update `, appointment);
  }

  public deleteAppointment(id : number): Observable<void>{
    
    return this.http.delete<void>(`${this.baseUrl}/appointment/delete/${id}`);
  }
  
  public getAppointmentbyUserEmail(email: string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointment/find/user/`+ email);
  } 
  public getAppointmentbyPatientEmail(email: string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointment/find/patient/`+ email);
  } 

  public getAppointmentbystartdateandenddate(start: string , end: string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointment/find/`+ start +`/`+ end);
  } 

  public createSession(session : Session): Observable<Session>{
    
    return this.http.post<Session>(`${this.baseUrl}/session/add`, session);
  }

  public getSession():Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/session/find`);
  }
  public getSessionbyUserEmail(email: string):Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/session/find/user/`+ email);
  } 

  public getSessionbyPatientEmail(email: string):Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/session/find/user/patient/`+ email);
  } 
  public getSessionbydiagnosisandgender(diagnosis: string , gender: string):Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/session/find/diagnosisgender/`+ diagnosis +`/`+ gender);
  } 


  public getSessionbydiagnosisanddistrict(diagnosis: string):Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/session/find/diagnosisdistrict/`+ diagnosis);
  } 

  public getSessionBydiagnosis():Observable<Session[]>{
    return this.http.get<Session[]>(`${this.baseUrl}/patient/find/diagnosis/{diagnosis}`);
  }
  public createPricing( pricing : Pricing): Observable<Pricing>{
    
    return this.http.post<Pricing>(`${this.baseUrl}/pricing/add`, pricing);
  }

  public getPricing():Observable<Pricing[]>{
    return this.http.get<Pricing[]>(`${this.baseUrl}/pricing/find`);
  }

  public getTotalPricing():Observable<Pricing[]>{
    return this.http.get<Pricing[]>(`${this.baseUrl}/pricing/find/total_bill`);
  }

  public getTotalPricingByDoctor():Observable<Pricing[]>{
    return this.http.get<Pricing[]>(`${this.baseUrl}/pricing/find/userbybill`);
  }
  
  public getUserByPatientId(id: number):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/find/patient/${id}`);
  }

  public scheduleAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/appointment/add`, appointment);
  }


} 
