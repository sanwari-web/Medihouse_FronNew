import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import { Appointment } from '../class/Appointment';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.scss'],
  providers: [DatePipe]
})
export class PatientdashboardComponent implements OnInit {
  consultants:User[];
  session: Session[];
  userdata: any=[];
  
  userdetails: any=[];
  myDate = new Date();
  public viewPatient: User;

  selectedConsultantEmail: string;
  public newappointmentdata: Appointment;
  currentDate: string;


  user:User[];
  selectedconsultantdata: any=[];
  patientdata: User[];
  email:''
public createAppointment: User;
selectedConsultant: any; 

 validateemailformat: boolean = false;

 showErrorMessage: boolean = false;
  
  constructor( private datePipe: DatePipe,
    private patientService: ConsultantService,
    private loginService: AuthenticationService) {
      const today = new Date();

      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
     }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getSessionbyUserEmail();
    this.getConsultants();
    this.getAppointment();

  }

  selectedDate: string;
  dateAvailable = true;
  timeSlotAvailable = true;
  selectedTimeSlot: string;

  // checkAvailability() {
  //   // Reset availability flag
  //   this.timeSlotAvailable = true;

  //   // Check if selected date, time slot, and consultant are available
  //   if (this.selectedConsultantEmail && this.selectedDate && this.selectedTimeSlot) {
  //     const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTimeSlot);

  //     // Check if selected time slot is already booked for the consultant
  //     const conflictingTimeSlot = this.appointment.find(appointment => {
  //       const selectedDateTime = new Date(this.selectedDate + 'T' + this.selectedTimeSlot);
  //       const appointmentDateTime = new Date(appointment.date + 'T' + appointment.time);
  //       return (
  //         appointment.user.id === this.selectedConsultantId &&
  //         selectedDateTime.getTime() === appointmentDateTime.getTime()
  //       );
  //     });
      

  //     if (conflictingTimeSlot) {
  //       this.timeSlotAvailable = false;
  //       return; // Exit the function if time slot is not available
  //     }
  //   }
  // }

  
  checkAvailability() {
    // Reset availability flags
    this.dateAvailable = true;
    this.timeSlotAvailable = true;
  
    // Check if selected date and time slot are available
    if (this.selectedDate && this.selectedTimeSlot) {
      const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTimeSlot);
  
      // Check if selected date and time slot are already booked
      const conflictingAppointment = this.appointment.find(appointment => {
        const appointmentDateTime = new Date(appointment.date + ' ' + appointment.time);
        return selectedDateTime.getTime() === appointmentDateTime.getTime();
      });
  
      if (conflictingAppointment) {
        this.dateAvailable = false;
        this.timeSlotAvailable = false;
        return; // Exit the function if date and time slot are not available
      }
    }
  }
  
  appointment:Appointment[];
  appointmentdata:any=[];

  public getAppointment(): void {
    this.patientService.getAppointment().subscribe(
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
  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'createappointment') {
      
      this.userdata = user;
      button.setAttribute('data-target', '#addAppointmentModal');
    }
    container.appendChild(button);
    button.click();
  }
  public getConsultants(): void {
    this.patientService.getConsultants().subscribe(
      (response: User[]) => {
        this.consultants = response;
        console.log(this.consultants);
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
        console.log(this.userdata);
        this.viewPatient = this.userdata;
      })
    }

  public getSessionbyUserEmail(): void{
    let email =  localStorage.getItem('email');
    console.log(email);
    this.patientService.getSessionbyPatientEmail(email).subscribe(
      (response: Session[]) => {
        this.session = response;
        console.log(this.session);
      })
    }

    public onAddAppointment(addAppointmentForm: NgForm): void {
      document.getElementById('addAppointmentModal').click();
      this.patientService.createAppointment(addAppointmentForm.value).subscribe(
        (response: Appointment) => {
          console.log(response);
          this.newappointmentdata = response;
          this.  generatePDF();
          this.AlertBox();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addAppointmentForm.reset();
        }
      );
      addAppointmentForm.reset();
  
    }
  
    generatePDF() {
      // Prepare the data for the PDF
      const appointmentData = this.newappointmentdata;
    
      // Create a new PDF document
      const doc = new jsPDF();
    
      // Add content to the PDF
      doc.setFontSize(12);
      doc.text(`Appointment Details`, 20, 20);
      doc.text(`Appointment Reference: #${appointmentData.id}`, 20, 30);
      doc.text(`Date: ${appointmentData.date}`, 20, 40);
      doc.text(`Patient Name: ${appointmentData.patient.first_name}  ${appointmentData.patient.last_name} `, 20, 50);
      doc.text(`Time: ${appointmentData.time}`, 20, 60);
      doc.text(`Consultant: Dr. ${appointmentData.user.first_name} ${appointmentData.user.last_name}`, 20, 70);
      doc.text(`Consultant Room : ${appointmentData.user.sessionroom}`, 20, 80);
      // Include additional fields as necessary
    
      // Save the PDF file
      doc.save('appointment.pdf');
    }
    
    selectedConsultantId: number;

    onConsultantChange() {
      this.selectedConsultant = this.selectedConsultantEmail;
   
      this.generateTimeSlots();
    }
    public getPatientByEmail(): void{ 
      const selectedConsultantEmail = this.selectedConsultantEmail;
     console.log(this.selectedConsultantEmail);
      this.patientService.getUserByEmail(this.selectedConsultantEmail).subscribe(
        (response: User[]) => {
          this.selectedconsultantdata = response;
        })
      }

      timeSlots: string[] = [];
      generateTimeSlots() {
        this.timeSlots = []; // Reset the timeSlots array
      
        const startTime = this.selectedConsultant?.appointmentstarttime;
        const endTime = this.selectedConsultant?.appointmentendttime;
      
        if (startTime && endTime) {
          const start = new Date(`1970/01/01 ${startTime}`);
          const end = new Date(`1970/01/01 ${endTime}`);
      
          while (start <= end) {
            const time = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}:${start.getSeconds().toString().padStart(2, '0')}`;
            this.timeSlots.push(time);
            start.setMinutes(start.getMinutes() + 15);
          }
        }
      }
      
      AlertBox() {
        Swal.fire('Appointment Created Succesfully!.', '', 'success');
      }

   
  logout(){
    this.loginService.logOut();

  }
}
