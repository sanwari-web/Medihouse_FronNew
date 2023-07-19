import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import { Appointment } from '../class/Appointment';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {
   user:User[];
   consultants:User[];
   selectedConsultantEmail: string;
   userdata: any=[];
   selectedconsultantdata: any=[];
   patientdata: User[];
   email:''
  public editPatient: User;
  public deletePatient: User;
  public createSession: User;
public createAppointment: User;
public viewPatient: User;
selectedConsultant: any; 

  public viewSessions : User;
  public newpatientdata: User;
  public newappointmentdata: Appointment;
  validateemailformat: boolean = false;
 
  showErrorMessage: boolean = false;
  currentDate: string;

  constructor( private patientService : ConsultantService,private consultantService:ConsultantService, private appointmentService : ConsultantService, public loginService:AuthenticationService, private router : Router,private activatedroute:ActivatedRoute) {
    
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
   }
  
  ngOnInit(): void {
    this.patientdata=history.state.data;

    this.getPatient();
    this.getConsultants();
    this.getAppointment();
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

  //update patient data
  public onUpdatePatient(user: User): void {
    this.patientService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getPatient();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //delete patient by id
  public onDeletePatient(id: number): void {
    this.patientService.deleteUser(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPatient();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  listPatientDetails() {
    this.consultantService.getPatient().subscribe(
      data => {
        console.log('patient' + JSON.stringify(this.patientdata));
        this.patientdata = this.patientdata;
      }
    );

}

  gotoSessionDetails(){
    this.router.navigate(['/sessiondetails'], {state: {data: this.createSession}});
    console.log(this.createSession);
    
  }

  gotoPatientDetails(email: string) {
    this.router.navigate(['/patientdetails'], { state: { data: { email } } });
    console.log(email);
  }


  
  //search patient in search bar
  public searchUser(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.user) {
      if (user.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.nic.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.user = results;
    if (results.length === 0 || !key) {
      this.getPatient();
    }
  }


  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editPatient = user;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deletePatient = user;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode === 'viewSessions') {
      // this.viewSessions = user;
      // this.gotoPatientDetails();
      const userEmail : any = this.editPatient?.email; // Assuming the user object has an email property
      this.gotoPatientDetails(userEmail);
    }
    if (mode === 'createsession') {
      this.createSession = this.editPatient;
      this.gotoSessionDetails();
    }
    if (mode === 'createappointment') {
      
      this.viewPatient = user;
      button.setAttribute('data-target', '#addAppointmentModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddPatient(addForm: NgForm): void {
    document.getElementById('addPatientModal').click();
    this.patientService.createUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.newpatientdata = response;
        this.router.navigate(['/sessiondetails'], {state: {data: this.newpatientdata}});
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onAddAppointment(addAppointmentForm: NgForm): void {
    document.getElementById('addAppointmentModal').click();
    this.appointmentService.createAppointment(addAppointmentForm.value).subscribe(
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
  nic : string ='';
  validateNic(): boolean {
    if (this.nic && this.nic.length === 10) {
      const pattern = /^[0-9]{9}[vV]$/; // Sri Lankan NIC pattern
      return pattern.test(this.nic);
    }
    return false;
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
  
  dob: string;

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day.toString(); // Add leading zero for single-digit days
    const formattedMonth = month < 10 ? `0${month}` : month.toString(); // Add leading zero for single-digit months

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  
  public getConsultants(): void {
    this.consultantService.getConsultants().subscribe(
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
      })
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
