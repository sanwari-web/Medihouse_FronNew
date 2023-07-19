import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../class/Session';
import { Appointment } from '../class/Appointment';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  user:User[];
  session:Session[];
  appointment: Appointment[];
  userdata: any=[];
  sessiondata: any=[];
  appointmentdata: any=[];

  email:''
 public editPatient: User;
 public deletePatient: User;
 public createSession: User;
 public newpatientdata: User;
 validateemailformat: boolean = false;

 patientdata: User[];


 constructor( private patientService : ConsultantService, public loginService:AuthenticationService, private router : Router,private activatedroute:ActivatedRoute) { }
 
 ngOnInit(): void {
  const email = history.state.data.email;
  console.log(email);
  this.getSessionbyPatientEmail();
 }
 ValidateEmail() 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
 {    this.validateemailformat = false;
 }else{
  this.validateemailformat = true;
 }
}

 //get all patient list
 public getPatient(): void {
   this.patientService.getPatient().subscribe(
     (response: User[]) => {
       this.user = response;
       console.log(this.user);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }

 public getUserByEmail(): void{ 
   let email =  localStorage.getItem('email');
  console.log(email);
   this.patientService.getUserByEmail(email).subscribe(
     (response: User[]) => {
       this.userdata = response;
     })
   }
   logout(){
     this.loginService.logOut();
 
   }

   listPatientDetails() {
    this.patientService.getPatient().subscribe(
      data => {
        console.log('patient' + JSON.stringify(this.patientdata));
        this.patientdata = this.patientdata;
      }
    );

}

public getSessionbyPatientEmail(): void{
  let email =  localStorage.getItem('email');
  console.log(this.patientdata);
  this.patientService.getSessionbyPatientEmail(email).subscribe(
    (response: Session[]) => {
      this.session = response;
      console.log(this.session);
      this.sessiondata  = this.session.length;
    })
  }


}