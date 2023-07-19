import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { User } from '../user';
import Swal from 'sweetalert2';import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Appointment } from '../class/Appointment';


@Component({
  selector: 'app-consultantprofile',
  templateUrl: './consultantprofile.component.html',
  styleUrls: ['./consultantprofile.component.scss']
})
export class ConsultantprofileComponent implements OnInit {

  isAdmin: boolean = false;

  matchconfirmpassword: boolean = false;
  passwordError: string | null = null;
  currentpassword = ''
  newpassword = ''
  confirmpassword = ''
  userdata: any =[];
  updatedUserData :any ;
  user:User[];
  public userdetails : User[];
  session : Session[];
  appointment : Appointment[];

  patient : Session[];
  public editConsultant: User;
  public sessiondata : number;
  public appointmentdata : number;

  validateemailformat: boolean = false;

  constructor(private userservice: ConsultantService,
    public loginService:AuthenticationService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getConsultants();
    this.getSessionbyUserEmail();
    this.getAppointmentbyUserEmail();
    this.setRoles();
  }

  erroremptypasswordAlertBox() {
    Swal.fire('Please fill required details!', 'An error occured', 'error');
}
errorpasswordAlertBox() {
  Swal.fire('Password is incorrect!', 'An error occured', 'error');
}
passwordchangeAlertBox() {
  Swal.fire('Password change successfull!', '', 'success');
}

userrole: any = String;

private setRoles(): void {
  let role =  localStorage.getItem("role");
  this.userrole = role;
  if(this.userrole === "Admin"){
     this.isAdmin = true; 
  }
}

validatePassword() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!passwordRegex.test(this.newpassword)) {
    this.passwordError = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.';
  } else {
    this.passwordError = null;
  }
}

matchpassword(){
  if(this.newpassword !='' && this.newpassword === this.confirmpassword){
      this.matchconfirmpassword = false;
  }else{
    this.matchconfirmpassword = true;
  }
}

  ChangePassword(){
   if(this.currentpassword === '' || this.newpassword === '' || this.confirmpassword === ''){
    this.erroremptypasswordAlertBox();
    }else{
      this.userdata.password = this.newpassword;
      this.updatedUserData = this.userdata;
      this.updatedUserData.currentPassword = this.currentpassword;
      this.userservice.changepassword(this.userdata).subscribe(
        (response: User) => {
          if(response = null){
            this.errorpasswordAlertBox();
          }else{
              this.passwordchangeAlertBox();
          }
        }
      )
    }
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

  public getConsultants(): void {
      this.userservice.getConsultants().subscribe(
        (response: User[]) => {
          this.user = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  public getSessionbyUserEmail(): void{
      let email =  localStorage.getItem('email');
      console.log(email);
      this.userservice.getSessionbyUserEmail(email).subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session);
          this.sessiondata  = this.session.length;
        })
      }

      public getAppointmentbyUserEmail(): void{
        let email =  localStorage.getItem('email');
        console.log(email);
        this.userservice.getAppointmentbyUserEmail(email).subscribe(
          (response: Appointment[]) => {
            this.appointment = response;
            console.log(this.appointment);
            this.appointmentdata  = this.appointment.length;
          })
        }
  

      
        
  logout(){
    this.loginService.logOut();

  }

  public onOpenModal(userdata: User, mode: string): void {
    const container = document.getElementById('myTabContent');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editConsultant = userdata;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onUpdateConsultant(userdata: User): void {
    this.userservice.updateUser(userdata).subscribe(
      (response: User) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  ValidateEmail() 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userdata.email))
    {    this.validateemailformat = false;
    }else{
     this.validateemailformat = true;
    }
  }
}
