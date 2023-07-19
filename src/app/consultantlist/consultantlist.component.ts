import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ConsultantService } from '../consultant.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-consultantlist',
  templateUrl: './consultantlist.component.html',
  styleUrls: ['./consultantlist.component.scss']
})
export class ConsultantlistComponent implements OnInit {
email = '';
password  ='';
  consultants:User[];
  public editConsultant: User;
  public deleteConsultant: User;
  validateemailformat: boolean = false;
  userdata: any =[];

  constructor( private consultantService: ConsultantService, public loginService:AuthenticationService) { }

  ngOnInit(): void {

    this.getConsultants();
    this.getUserByEmail();
   this.updateSessionTime(); 
  }
  ValidateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
  {    this.validateemailformat = false;
  }else{
   this.validateemailformat = true;
  }
}
selectedSessionTime: string;
sessionStartTime: string;
sessionEndTime: string;

// Function to update the session start and end times
updateSessionTime() {
   const timeRange = this.selectedSessionTime.split(' - ');
   this.sessionStartTime = timeRange[0];
   this.sessionEndTime = timeRange[1];

   // Now you can pass the start and end times to the database or perform any other operations
   // Example: this.yourService.saveSessionTime(this.sessionStartTime, this.sessionEndTime);
}

  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.consultantService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }
    selectedRoom: string;
       // Function to check room availability
       checkRoomAvailability() {
        const isRoomAvailable = this.isRoomAvailable(this.selectedRoom, this.selectedSessionTime);
      
        if (isRoomAvailable) {
          // Room is available
          console.log(`Room ${this.selectedRoom} is available for the selected time slot.`);
        } else {
          // Room is not available
          console.log(`Room ${this.selectedRoom} is already filled with the selected time slot.`);
          this.AlertBox();
        }
      }
      
      isRoomAvailable(room: string, timeSlot: string): boolean {
        const isRoomBooked = this.consultants.some((consultant) => {
          const consultantStartTime = consultant.appointmentstarttime;
          const consultantEndTime = consultant.appointmentendttime;
      
          const selectedStartTime = this.convertTimeString(timeSlot.split(' - ')[0]);
          const selectedEndTime = this.convertTimeString(timeSlot.split(' - ')[1]);
      
          if (consultant.sessionroom === room) {
            const isStartTimeOverlap =
              selectedStartTime >= consultantStartTime && selectedStartTime < consultantEndTime;
            const isEndTimeOverlap =
              selectedEndTime > consultantStartTime && selectedEndTime <= consultantEndTime;
      
            if (isStartTimeOverlap || isEndTimeOverlap) {
              return true; // Room is already booked
            }
          }
      
          return false; // Room is available
        });
      
        return !isRoomBooked; // Return true if the room is available, false if it's already booked
      }
      
      convertTimeString(timeString: string): string {
        const [hour, minute] = timeString.split(':');
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
      }
      
 AlertBox() {
  Swal.fire('Room is already filled with the selected time slot.', '', 'error');
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

  nic: string = '';

  validateNic(): boolean {
    if (this.nic && this.nic.length === 10) {
      const pattern = /^[0-9]{9}[vV]$/; // Sri Lankan NIC pattern
      return pattern.test(this.nic);
    }
    return false;
  }
  validatePassword(password: string): boolean {
    // Password policies: minimum 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return pattern.test(password);
  }
  public onAddConsultant(addForm: NgForm): void {
    document.getElementById('add-user-form').click();
    this.consultantService.createUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getConsultants();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateConsultant(user: User): void {
    this.consultantService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getConsultants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteConsultant(id: number): void {
    this.consultantService.deleteUser(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getConsultants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   //search user in search bar
   public searchUser(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const consultants of this.consultants) {
      if (consultants.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultants.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultants.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || consultants.nic.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(consultants);
      }
    }
    this.consultants = results;
    if (results.length === 0 || !key) {
      this.getConsultants();
    }
  }

  

  public onOpenModal(consultant: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editConsultant = consultant;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteConsultant = consultant;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
  logout(){
    this.loginService.logOut();

  }


}
