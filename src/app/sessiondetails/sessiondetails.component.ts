import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { Pricing } from '../class/Pricing';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { User } from '../user';
import Swal from 'sweetalert2';import { AbstractControl,FormControl} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { MatTooltip } from '@angular/material/tooltip';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-sessiondetails',
  templateUrl: './sessiondetails.component.html',
  styleUrls: ['./sessiondetails.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class SessiondetailsComponent implements OnInit {

  emailnm = ''
  email = ''
 myDate = new Date();
  public session:Session[];
  patientdata: User[];
  user:User[];
  doctor:User[];
  userdata: any=[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public pricing: Pricing[];
  public sessiondata : any;
  consultation_fees: number;
  medication_fees: number;
  myForm: FormGroup;
  showErrorMessage: boolean = false;
  
  constructor(private _formBuilder: FormBuilder, public loginService:AuthenticationService,private route: ActivatedRoute,private consultantService: ConsultantService,private ngWizardService: NgWizardService, private router: Router) {
    this.myForm = this._formBuilder.group({
      reason:['', Validators.required],
    });
   }

   get reason() {
    return this.myForm.get('reason');
  }

  ngOnInit(): void {
  
    this.patientdata=history.state.data;
    // let email =  sessionStorage.getItem('email');
    // console.log(email);
    this.getConsultants();
    this.getUserByEmail();
  }
  AlertBox() {
    Swal.fire('Session Completed successfull!', '', 'success');
  }


  public getUserByEmail(): void{ 
    let email = localStorage.getItem('email');
   console.log(email);
    this.consultantService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.doctor = response;
        console.log(this.doctor);
      })
    }
  public getConsultants(): void {
    let email = localStorage.getItem('email');
    console.log(email);
    this.consultantService.getConsultants().subscribe(
      (response: User[]) => {
        this.user = response;
        this.userdata = this.user.filter(user => user.email === email);
        console.log(this.userdata);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //search patient in search bar
  public searchPatient(key: string): void {
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
  public searchSession(key: string): void {
    console.log(key);
    const results:  Session[] = [];
    for (const session of this.session) {
      if (session.diagnosis.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || session.diagnosis_details.toLowerCase().indexOf(key.toLowerCase()) !== -1
     ) {
        results.push(session);
      }
    }
    this.session = results;
    if (results.length === 0 || !key) {
      this.getSessionBydiagnosis();
  }
  }

  

  public getPatient(): void {
    this.consultantService.getPatient().subscribe(
      (response: User[]) => {
        this.user = response;
        console.log(this.user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSessionBydiagnosis(): void {
    this.consultantService.getSessionBydiagnosis().subscribe(
      (response: Session[]) => {
        this.session = response;
        console.log(this.session);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPricing(addForm1: NgForm): void {
    document.getElementById('addPricingModal').click();
  this.consultantService.createPricing(addForm1.value).subscribe(
    (response: Pricing) => {
      console.log(response);
      this.AlertBox();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm1.reset();
    }
  );
}

  
  public onAddSession(addForm: NgForm): void {
    document.getElementById('addSessionModal').click();
    this.consultantService.createSession(addForm.value).subscribe(
      (response: Session) => {
        this.sessiondata = response;
        console.log(response) ;
        console.log(this.sessiondata);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
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

alertConfirmation() {
  Swal.fire({
      position: 'top-start',
      title: 'Buy Product X',
      text: 'This product is invincible.',
      icon: 'warning',
      showCancelButton: true,
  })
}
logout(){
  this.loginService.logOut();

}

}



