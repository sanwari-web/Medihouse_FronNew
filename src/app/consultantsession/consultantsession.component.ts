import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultantService } from '../consultant.service';
import { Session } from '../class/Session';
import { Pricing } from '../class/Pricing';
import { User } from '../user';
 

@Component({
  selector: 'app-consultantsession',
  templateUrl: './consultantsession.component.html',
  styleUrls: ['./consultantsession.component.scss']
})
export class ConsultantsessionComponent implements OnInit {


  userdata: any =[];
  user:User[];
  public viewPatient : User;
  public session:Session[];
  public pricing: Pricing[];

  @ViewChild('f') patientDataForm : NgForm;

 firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  
  constructor(private _formBuilder: FormBuilder, private consultantService: ConsultantService,private ngWizardService: NgWizardService, private router: Router) { }

  ngOnInit(): void {
    this.getPatient();
    this.getUserByEmail();
  }

  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.consultantService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
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

  fillValues(){
   this.patientDataForm.form.setValue({

   })
  }

  public searchPatientByNIC(key: string): void {
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

  public onAddPatient(addForm: NgForm): void {
    this.consultantService.createUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // public onAddSession(addForm: NgForm): void {
  //   document.getElementById('add-user-form').click();
  //   this.consultantService.createSession(addForm.value).subscribe(
  //     (response: Session) => {
  //       console.log(response);
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  //   public onAddPricing(addForm: NgForm): void {
  //     document.getElementById('addPricingModal').click();
  //   this.consultantService.createPricing(addForm.value).subscribe(
  //     (response: Pricing) => {
  //       console.log(response);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  // gotoSessionPricing(){
  //   this.router.navigate(['/sessionpricing']);
  // }  
  
 
}


