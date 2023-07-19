import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import { Appointment } from '../class/Appointment';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.scss']
})
export class PatientprofileComponent implements OnInit {
  consultants:User[];
  userdata: any=[];
  userdetails: any=[];
  myDate = new Date();
  patientdata: User[];
  appointment: Appointment[];
  appointmentdata: any=[];
  
  constructor( 
    private patientService: ConsultantService,
    private loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getAppointmentbyPatientEmail();
  }

  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.patientService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
        console.log(this.userdata);
      })
    }
    logout(){
      this.loginService.logOut();
  
    }

    public getAppointmentbyPatientEmail(): void{
      let email =  localStorage.getItem('email');
      this.patientService.getAppointmentbyPatientEmail(email).subscribe(
        (response: Appointment[]) => {
          this.appointment = response;
          console.log(this.appointment);
          this.appointmentdata  = this.appointment.length;
        })
      }

}
