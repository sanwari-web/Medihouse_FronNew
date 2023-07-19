import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultantService } from '../consultant.service';
import { User } from '../user';
import { Session } from '../class/Session';
import { AuthenticationService } from '../service/authentication.service';

import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;
  userdata: any =[];
  updatedUserData :any ;
  user:User[];
  public userdetails : User[];
  session : Session[];
  patient : Session[];
  public editConsultant: User;
  public sessiondata : number;
  currentDate: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private userservice: ConsultantService,
    public loginService:AuthenticationService
  ) {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required]
    });

    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }

  submitForm() {
    if (this.appointmentForm.invalid) {
      return;
    }

    this.userservice
      .scheduleAppointment(this.appointmentForm.value)
      .subscribe(
        response => {
          console.log('Appointment scheduled successfully:', response);
          // Add any additional logic or notifications here
        },
        error => {
          console.error('Error scheduling appointment:', error);
          // Handle error and display appropriate message
        }
      );
  }

  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.userservice.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
        this.userdetails = this.userdata;
        console.log(this.userdetails);
      })
    }
  logout(){
    this.loginService.logOut();

  }
  
}

