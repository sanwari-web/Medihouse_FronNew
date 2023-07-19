import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-consultantroom',
  templateUrl: './consultantroom.component.html',
  styleUrls: ['./consultantroom.component.scss']
})
export class ConsultantroomComponent implements OnInit {
  email = '';
  consultants:User[];
  public editConsultant: User;
  public deleteConsultant: User;
  validateemailformat: boolean = false;
  userdata: any =[];

  constructor( private consultantService: ConsultantService, public loginService:AuthenticationService) { }

  ngOnInit(): void {

    this.getConsultants();
    this.getUserByEmail();


  } 


 // Function to simulate room availability check (replace with your actual validation logic)
 isRoomAvailable(room: string, timeSlot: string): string | boolean {
  const bookedConsultant = this.consultants.find((consultant) => {
    const consultantStartTime = consultant.appointmentstarttime;
    const consultantEndTime = consultant.appointmentendttime;

    const selectedStartTime = this.convertTimeString(timeSlot.split(' - ')[0]);
    const selectedEndTime = this.convertTimeString(timeSlot.split(' - ')[1]);

    // Check for overlapping time slots
    if (
      consultant.sessionroom === room &&
      selectedStartTime >= consultantStartTime &&
      selectedEndTime <= consultantEndTime
    ) {
      return true; // Room is already booked
    }

    return false; // Room is available
  });

  if (bookedConsultant) {
    return   ' Dr. ' + bookedConsultant.first_name  + ' ' + bookedConsultant.last_name as string; // Return consultant name as string if room is booked
  }

  return false; // Return false if room is available
}

convertTimeString(timeString: string): string {
  const [hour, minute] = timeString.split(':');
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
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
    this.consultantService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }
  logout(){
    this.loginService.logOut();

  }
}
