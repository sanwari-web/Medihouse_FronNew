import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Session } from '../class/Session';
import { User } from '../user';
import { AuthenticationService } from '../service/authentication.service';
import { ConsultantService } from '../consultant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../class/Appointment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-patientappointments',
  templateUrl: './patientappointments.component.html',
  styleUrls: ['./patientappointments.component.scss']
})
export class PatientappointmentsComponent implements OnInit {

 
  userdata: any=[];
  session: Session[];
  consultants:User[];
  patientid: any=[];
  patient:Session[];
  sessiondata: any=[];
  appointmentdata: any=[];

  appointment: Appointment[];
  myDate = new Date();
  public totalvalues: number = 0;

  updatedUserData :any ;
  user:User[];
  public userdetails : User[];
  public editConsultant: User;
  currentDate: string;
  selectedAppointment: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService :ConsultantService,
    private sessiontService :ConsultantService,
    private consultantService: ConsultantService,
    public loginService:AuthenticationService) { 
      const today = new Date();

      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
    }
    datePickerConfig: Partial<BsDatepickerConfig>;

  ngOnInit(): void {
    this.getAppointmentbyPatientEmail();
    this.getUserByEmail();

    this.datePickerConfig = {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'MM/DD/YYYY',
      // Additional configuration options can be added here
    };
  }

  public searchAppointment(key1: string): void {
    console.log(key1);
    const results: Appointment[] = [];
    for (const appointmentdata of this.appointment) {
      if (appointmentdata.patient.first_name.toLowerCase().indexOf(key1.toLowerCase()) !== -1
      || appointmentdata.user.first_name.toLowerCase().indexOf(key1.toLowerCase()) !== -1
      || appointmentdata.note.toLowerCase().indexOf(key1.toLowerCase()) !== -1
      )
       {
        results.push(appointmentdata);
      }
    }
    this.appointmentdata = results;
    if (results.length === 0 || !key1) {
      this.getAppointmentbyPatientEmail();
    }
  }

  public searchAppointmentByDate(date: Date | string): void {
    console.log(date);
    const results: Appointment[] = [];
    const searchDate = typeof date === 'string' ? new Date(date) : date; // Convert to Date object if it's a string
  
    for (const appointmentData of this.appointment) {
      const appointmentDate = new Date(appointmentData.date); // Convert the appointment date to Date object if needed
  
      if (
        appointmentDate.getFullYear() === searchDate.getFullYear() &&
        appointmentDate.getMonth() === searchDate.getMonth() &&
        appointmentDate.getDate() === searchDate.getDate()
      ) {
        results.push(appointmentData);
      }
    }
  
    this.appointmentdata = results;
  
    if (results.length === 0 || !date) {
      this.getAppointmentbyPatientEmail();
    }
  }
  
  
     //search user in search bar
     public searchSession(key: string): void {
      console.log(key);
      const results: Session[] = [];
      for (const session of this.session) {
        if (session.diagnosis.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || session.reason.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(session);
        }
      }
      this.session = results;
      if (results.length === 0 || !key) {
        this.getSession();
      }
    }
    public searchSession2(key: string): void {
      console.log(key);
      const results: User[] = [];
      for (const patient of this.patient) {
        if (
         patient.patient_id.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(patient.patient_id);
        }
      }
      if (results.length === 0 || !key) {
        this.getSession();
      }
    }
  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.patientService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }
    
    public getAppointmentbyPatientEmail(): void{
      let email =  localStorage.getItem('email');
      this.patientService.getAppointmentbyPatientEmail(email).subscribe(
        (response: Appointment[]) => {
          this.appointment = response;
          console.log(this.appointment);
          this.appointmentdata  = this.appointment;
        })
      }
  public getSession(): void {
    this.sessiontService.getSession().subscribe(
      (response: Session[]) => {
        this.session = response;
        console.log(this.session);
        this.sessiondata = this.session;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  logout(){
    this.loginService.logOut();

  }
}
