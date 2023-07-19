import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgWizardConfig, NgWizardService, STEP_STATE, THEME } from 'ng-wizard';
import { Pricing } from '../class/Pricing';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { User } from '../user';

@Component({
  selector: 'app-sessionpricing',
  templateUrl: './sessionpricing.component.html',
  styleUrls: ['./sessionpricing.component.scss']
})
export class SessionpricingComponent implements OnInit {

  public pricing: Pricing[];
  public session:Session[];

  user:User[];
  consultation_fees: number;
  medication_fees: number;
  patientsession: User[];

  constructor(private route: ActivatedRoute,private consultantService: ConsultantService,private ngWizardService: NgWizardService, private router: Router) { }

  ngOnInit(): void {
    this.listPatientDetails();
    this.patientsession=history.state.data;
    console.log(this.patientsession);
    
  }

    public onAddPricing(addForm: NgForm): void {
      document.getElementById('addPricingModal').click();
    this.consultantService.createPricing(addForm.value).subscribe(
      (response: Pricing) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
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

    
  listPatientDetails() {
    this.consultantService.getPatient().subscribe(
      data => {
        console.log('patient' + JSON.stringify(this.patientsession));
        this.patientsession = this.patientsession;
      }
    );
}
}