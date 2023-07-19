import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  email = '';
  password = '';
  invalidLogin = false;
  role = '';
  validateemailformat: boolean = false;
  @Input() error: string | null;

  user: User[];
  loggedInUser: any;
  form: FormGroup;
  emailValidation: boolean = true;
  passwordError: string | null = null;
  public userdoctor: User[];
  public useradmin: User[];
  public userdetails: User[];
  public userdata: any = [];
  isFormSubmitted = false;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private userservice: ConsultantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  errorAlertBox() {
    Swal.fire('Email or Password is incorrect! ', 'An error occured', 'error');
  }
  alertConfirmation() {
    Swal.fire({
      position: 'top-start',
      title: 'Buy Product X',
      text: 'This product is invincible.',
      icon: 'warning',
      showCancelButton: true,
    });
  }
  erroremailAlert() {
    Swal.fire(
      'Please insert a valid email address and password!',
      'An error occured',
      'error'
    );
  }

  erroremailformatAlert() {
    Swal.fire('Invalid email address!', 'An error occured', 'error');
  }

  ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.validateemailformat = false;
    } else {
      this.validateemailformat = true;
    }
  }
  checkLogin() {
    if (this.email === '' && this.password === '') {
      this.erroremailAlert();
    } else {
      this.loginservice.authenticate(this.email, this.password).subscribe(
        (data) => {
          this.getUserByEmail();
          this.getConsultants();
          this.invalidLogin = false;
        },
        (error) => {
          this.invalidLogin = true;
          this.error = error.message;
          this.errorAlertBox();
        }
      );
    }
  }

  public getUserByEmail(): void {
    this.userservice
      .getUserByEmail(this.email)
      .subscribe((response: User[]) => {
        console.log(response);
        this.loggedInUser = response;
        localStorage.setItem('role', this.loggedInUser.role.toString());
        let role = localStorage.getItem('role');
        if (role === 'Patient') {
          this.router.navigate(['/patientdashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public getConsultants(): void {
    this.userservice.getConsultants().subscribe(
      (response: User[]) => {
        this.user = response;
        console.log(this.user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  validatePassword() {
    // Password validation rules
    const minLength = 8;
    const maxLength = 20;
    const containsUppercase = /[A-Z]/;
    const containsLowercase = /[a-z]/;
    const containsDigit = /\d/;

    if (this.password.length < minLength || this.password.length > maxLength) {
      this.passwordError = `Password must be between ${minLength} and ${maxLength} characters long.`;
    } else if (!containsUppercase.test(this.password)) {
      this.passwordError = 'Password must contain at least one uppercase letter.';
    } else if (!containsLowercase.test(this.password)) {
      this.passwordError = 'Password must contain at least one lowercase letter.';
    } else if (!containsDigit.test(this.password)) {
      this.passwordError = 'Password must contain at least one digit.';
    } else {
      this.passwordError = null;
    }
  }

  getErrorMessageClass() {
    return this.passwordError ? 'error' : '';
  }

}
