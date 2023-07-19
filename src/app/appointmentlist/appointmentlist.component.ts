import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import { Session } from '../class/Session';
import { Appointment } from '../class/Appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.scss']
})
export class AppointmentlistComponent implements OnInit {


  myDate = new Date();
  appointment:Appointment[];
  public totalvalues: number = 0;

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
  appointmentdata:any=[];
  selectedAppointment: any;

  constructor( private formBuilder: FormBuilder,
    private userservice: ConsultantService,
    private appointmentService: ConsultantService,
    public loginService:AuthenticationService) {
      const today = new Date();

      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
     }

    datePickerConfig: Partial<BsDatepickerConfig>;
  ngOnInit(): void {
    this.getAppointment();

    this.datePickerConfig = {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'MM/DD/YYYY',
      // Additional configuration options can be added here
    };
  }

  events = [
    {
      title: 'Day 1',
      date: new Date(2023, 0, 2),
      agenda: [
        {
          time: '9:00 AM - 10:00 AM',
          title: 'Registration and Coffee',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        // Add more agenda items for Day 1 if needed
      ]
    },
    {
      title: 'Day 2',
      date: new Date(2023, 0, 3),
      agenda: [
        {
          time: '9:00 AM - 10:00 AM',
          title: 'Excepteur sint occaecat',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        // Add more agenda items for Day 2 if needed
      ]
    }
  ];


  activeDayIndex = 0;

  setActiveDay(index: number) {
    this.activeDayIndex = index;
  }

  public getAppointment(): void {
    this.appointmentService.getAppointment().subscribe(
      (response: Appointment[]) => {
        this.appointment = response;
        console.log(this.appointment);
        this.appointmentdata = this.appointment;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editAppointment: Appointment;

  public openEditModal(appointmentdata: any): void {
    this.selectedAppointment = appointmentdata;
  }
  
  
  public updateAppointment(selectedAppointment: Appointment): void {
    document.getElementById('editAppointmentModal').click();

    this.appointmentService.updateAppointment(selectedAppointment).subscribe(
      (response: Appointment) => {
        console.log(response);
        this.getAppointment();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
      this.getAppointment();
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
      this.getAppointment();
    }
  }
  
  
public DeleteAppointment(id: number): void {
  const confirmModal = document.getElementById("confirmModal");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  confirmModal.style.display = "block"; // Show the confirmation modal

  confirmBtn.onclick = () => {
    confirmModal.style.display = "none"; // Hide the confirmation modal

    this.appointmentService.deleteAppointment(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAppointment();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  cancelBtn.onclick = () => {
    confirmModal.style.display = "none"; // Hide the confirmation modal
  };
}

  
  
}
