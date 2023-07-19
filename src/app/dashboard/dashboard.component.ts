import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultantService } from '../consultant.service';
import { PatientdashboardComponent } from '../patientdashboard/patientdashboard.component';
import { Session } from '../class/Session';
import { Pricing } from '../class/Pricing';
import { AuthenticationService } from '../service/authentication.service';
import { DatePipe } from '@angular/common';

declare var name: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})


export class DashboardComponent implements OnInit {
  consultants:User[];
  session: Session[];
  pricing: Pricing[];
  public totalvalues: number = 0;
  public editConsultant: User;
  collapsed = true;
 public findtotalpatient : number;
 public total_bill : number;
 public findtotalsession : number;
 public findtotalconsultant: number;
 public femalepatient: User[];
 userdata: any=[];
 userrole: any = String;
 user: User[];
 public userdetails : User[];
 myDate = new Date();
 isAdmin: boolean = false;

  title = 'app-js'; 

  isLoggedIn = false;
  public femalpatient:any =[];
  public malepatient:any =[];

  public pieChartLabels = ['Female Patient', 'Male Patient'];
  public pieChartData = [1,2];
  public pieChartType : ChartType = 'pie';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService :ConsultantService,
    private sessiontService :ConsultantService,
    private datePipe: DatePipe,
    private consultantService: ConsultantService,
    public loginService:AuthenticationService) { }

  ngOnInit() {
    this.getConsultants();
    this.getPatient();
    this.getSession();
    this.getPricing();
    this.getPatientByGenderFemale();
    this.getUserByEmail();
    this.getPatientByGender();
    let currentDateTime =this.datePipe.transform((new Date), 'MM/dd/yyyy');
    console.log(currentDateTime);
    this.setRoles();
  }
 
 
  private setRoles(): void {
    let role =  localStorage.getItem("role");
    this.userrole = role;
    if(this.userrole === "Admin"){
       this.isAdmin = true; 
    }
 }
 public getPatientByGender(): void{
  this.patientService.getPatient().subscribe(
    (response: User[]) => {
      this.user = response;
      console.log(this.user);
      this.femalpatient = this.user.filter(user => user.gender === 'Female');
      console.log(this.user.filter.length);
      this.malepatient = this.user.filter(user => user.gender === 'Male');
      console.log(this.malepatient.length);
      
    this.pieChartData = [this.femalpatient.length, this.malepatient.length];
    })
  }

  public onOpenPatient(): void{

  }
  public getConsultants(): void {
    this.consultantService.getConsultants().subscribe(
      (response: User[]) => {
        this.consultants = response;
        console.log(this.consultants);
        this.findtotalconsultant =this.consultants.length;
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
        this.userdetails = this.userdata;
        console.log(this.userdetails);
      })
    }


  public getPricing(): void {
    this.patientService.getPricing().subscribe(
      (response: Pricing[]) => {
        this.pricing = response;
        console.log(this.pricing);
        let sum = 0;

        this.pricing.forEach((pricing) => {
          sum += pricing.total_bill;
        });
        
        console.log(sum);
        this.totalvalues = sum;
    
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

  public getPatient(): void {
    this.patientService.getPatient().subscribe(
      (response: User[]) => {
        this.user = response;
        console.log(this.user);
        this.findtotalpatient = this.user.length;
        console.log(this.findtotalpatient);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getSession(): void {
    this.sessiontService.getSession().subscribe(
      (response: Session[]) => {
        this.session = response;
        console.log(this.session);
        this.findtotalsession = this.session.length;
        console.log(this.findtotalsession);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public getPatientByGenderFemale(): void{
  this.patientService.getPatient().subscribe(
    (response: User[]) => {
      this.user = response;
      console.log(this.user);
      this.femalepatient = this.user.filter(user => user.gender === 'Female');
      console.log(this.femalepatient.length);
    })
  }

  
  logout(){
    this.loginService.logOut();

  }

  
}

