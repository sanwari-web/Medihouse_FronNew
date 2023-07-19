import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { User } from '../user';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Pricing } from '../class/Pricing';
import { AuthenticationService } from '../service/authentication.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reportpage',
  templateUrl: './reportpage.component.html',
  styleUrls: ['./reportpage.component.scss']
})
export class ReportpageComponent implements OnInit {
  consultants:User[];
  userdata: any =[];
  user: User[];
  session: Session[];
  pricing: Pricing[];
  totalrevenue: any = [];
  doctorsname: any = [];
  feverdistrict: any = [];
  fevercount: any = [];
  headachedistrict: any = [];
  headachecount: any = [];
  chestpaindistrict: any = [];
  chestpaincount: any = [];
  asathmadistrict: any = [];
  asathmacount: any = [];
  muscledistrict: any = [];
  musclecount: any = [];
  coughdistrict: any = [];
  coughcount: any = [];
  diarrheadistrict: any = [];
  diarrheacount: any = [];
  throatdistrict: any = [];
  throatcount: any = [];
  otherdistrict: any = [];
  othercount: any = [];
  public malediagnosis: any=[];
  public femalediagnosis: any=[];
  public diagnosis: any=[];
  public totalpatient : number;
 public editConsultant: User;
 public findtotalpatient : number;
 public findtotalsession : number;
 public findtotalconsultant: number;
 public femalepatientcount:number = 0;
 public malepatientcount:number = 0;
 public femalepatient: User[];
 public malepatient: User[];
 public patientcountfever: Session[];
 public patientcountHeadache: Session[];
 public patientcountChestPain: Session[];
 public patientcountAsathma: Session[];
 public patientcountMuscle: Session[];
 public patientcountCough: Session[];
 public patientcountDiarrhea: Session[];
 public patientcountThroat: Session[];
 public patientcountOther: Session[];
 public patientcountfem : Session[];
public femalefever: Session[];
public femaleheadache: Session[];
public femalechestpain: Session[];
public femaleasathma: Session[];
public femalemuscle: Session[];
public femalecough: Session[];
public femalediarrhea: Session[];
public femalethroat: Session[];
public femaleother: Session[];
public malefever: Session[];
public maleheadache: Session[];
public malechestpain: Session[];
public maleasathma: Session[];
public malemuscle: Session[];
public malecough: Session[];
public malediarrhea: Session[];
public malethroat: Session[];
public maleother: Session[];
public feverColombo:  any=[];
public feverGampaha: any=[];
public sessiondata: any=[];
 
 diseasetype : string="";
 closeResult: string;
  pieChartdata13: number[];

  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef;

  // pieChartLabels: string[] = ['Male', 'Female'];
  // pieChartData: number[] = [30, 70];
  // pieChartType: ChartType = 'pie';


  constructor( private router: Router,
    private patientService :ConsultantService,
    private sessiontService :ConsultantService,private modalService: NgbModal,
    public loginService:AuthenticationService,
    private elementRef: ElementRef) { 
      monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    }

    public pieChartOptions: ChartOptions = {
      responsive: true,
    };

    

  ngOnInit(): void {
    this.getConsultants();
    this.getPatient();
    this.getSession();
    this.getPatientByGender();
    this.getPatientByDisease();
    this.getPatientByDistrict();
    this.getPatientByGenderdiagnosis();
    this.getUserByEmail();
    this.getPatientByMalediagnosis();
    this.getPatientBydiagnosisfever();
    this.getPatientBydiagnosisheadache();
    this.getPatientBydiagnosischestpain();
    this.getPatientBydiagnosisasathma();
    this.getPatientBydiagnosismuscle();
    this.getPatientBydiagnosiscough();
    this.getPatientBydiagnosisdiarrhea();
    this.getPatientBydiagnosisthroat();
    this.getPatientBydiagnosisother();
    this.getPricingByDoctor();
    this.getSessionbyUserEmail();
  }

  downloadDetailsAsPDF(): void {
    this.patientService.getPatient().subscribe((response: User[]) => {
      this.user = response;
      console.log(this.user);
      this.femalepatient = this.user.filter((user) => user.gender === 'Female');
      console.log(this.femalepatient.length);
      this.malepatient = this.user.filter((user) => user.gender === 'Male');
      console.log(this.malepatient.length);

      const pdf = new jsPDF();
      const content = `Female Patients: ${this.femalepatient.length}\nMale Patients: ${this.malepatient.length}`;

      pdf.text(content, 10, 10); // Customize the position of the content in the PDF
      pdf.save('patient_details.pdf');
    });
  }
  public getConsultants(): void {
    this.patientService.getConsultants().subscribe(
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

public getPatientByGender(): void{
  this.patientService.getPatient().subscribe(
    (response: User[]) => {
      this.user = response;
      console.log(this.user);
      this.femalepatient = this.user.filter(user => user.gender === 'Female');
      console.log(this.femalepatient.length);
      this.malepatient = this.user.filter(user => user.gender === 'Male');
      console.log(this.malepatient.length);
    })
  }


//get patient by diseases
public getPatientByDisease(): void{
  this.patientService.getSession().subscribe(
    (response: Session[]) => {
      this.session = response;
      console.log(this.session);
      this.patientcountfever = this.session.filter(session => session.diagnosis === 'Fever');
      console.log(this.patientcountfever.length);
      this.patientcountHeadache = this.session.filter(session => session.diagnosis === 'Headache');
      console.log(this.patientcountHeadache.length);
      this.patientcountChestPain = this.session.filter(session => session.diagnosis === 'Chest Pain');
      console.log(this.patientcountChestPain.length);
      this.patientcountAsathma = this.session.filter(session => session.diagnosis === 'Asathma');
      console.log(this.patientcountAsathma.length);
      this.patientcountMuscle = this.session.filter(session => session.diagnosis === 'Muscle or body aches');
      console.log(this.patientcountMuscle.length);
      this.patientcountCough = this.session.filter(session => session.diagnosis === 'Cough');
      console.log(this.patientcountCough.length);
      this.patientcountDiarrhea = this.session.filter(session => session.diagnosis === 'Diarrhea');
      console.log(this.patientcountDiarrhea.length);
      this.patientcountThroat = this.session.filter(session => session.diagnosis === 'Sore Throat');
      console.log(this.patientcountThroat.length);
      this.patientcountOther = this.session.filter(session => session.diagnosis === 'Other');
      console.log(this.patientcountOther.length);
    })
}
public getPatientByDistrict(): void{
  this.patientService.getPatient().subscribe(
    (response: User[]) => {
      this.user = response;
      console.log(this.user);
      this.patientcountcolombo = this.user.filter(user => user.district === 'Colombo');
      this.patientcountgampaha = this.user.filter(user => user.district === 'Gampaha');
      this.patientcountkaluthra = this.user.filter(user => user.district === 'Kalutara');
      this.patientcountkandy = this.user.filter(user => user.district === 'Kandy');
      this.patientcountMatale = this.user.filter(user => user.district === 'Matale');
      this.patientcountNuwaraeli = this.user.filter(user => user.district === 'Nuwara Eliya');
      this.patientcountgalle = this.user.filter(user => user.district === 'Galle');
      this.patientcountmatara = this.user.filter(user => user.district === 'Matara');
      this.patientcounthambantota = this.user.filter(user => user.district === 'Hambantota');
      this.patientcountjaffna = this.user.filter(user => user.district === 'Jaffna');
      this.patientcountkilinochchi = this.user.filter(user => user.district === 'Kilinochchi');
      this.patientcountmanner = this.user.filter(user => user.district === 'Mannar');
      this.patientcountvavuniya = this.user.filter(user => user.district === 'Vavuniya');
      this.patientcountmullaitivu = this.user.filter(user => user.district === 'Mullaitivu');
      this.patientcountbatticaloa = this.user.filter(user => user.district === 'Batticaloa');
      this.patientcountampara = this.user.filter(user => user.district === 'Ampara');
      this.patientcounttrinco = this.user.filter(user => user.district === 'Trincomalee');  
      this.patientcountkurunagala = this.user.filter(user => user.district === 'Kurunegala');
      this.patientcountputtalam = this.user.filter(user => user.district === 'Puttalam');
      this.patientcountanuradapura = this.user.filter(user => user.district === 'Anuradhapura');
      this.patientcountpolonnaruwa = this.user.filter(user => user.district === 'Polonnaruwa');
      this.patientcountbadulla = this.user.filter(user => user.district === 'Badulla');
      this.patientcountmonaragala = this.user.filter(user => user.district === 'Moneragala');
      this.patientcountrathnapura = this.user.filter(user => user.district === 'Ratnapura');
      this.patientcountkegalla = this.user.filter(user => user.district === 'Kegalle');
    
    })
    }
    Datachart: any[];
    //get patient by gender and diagnosis
//get patient by gender and diagnosis
public getPatientByGenderdiagnosis(): void{
  this.patientService.getSessionbydiagnosisandgender('Fever','Female').subscribe(
    (response: Session[]) => {
      this.session = response;
      this.femalefever = this.session;
    });
  this.patientService.getSessionbydiagnosisandgender('Headache','Female').subscribe(
      (response: Session[]) => {
        this.session = response;
        this.femaleheadache = this.session;
      });
  this.patientService.getSessionbydiagnosisandgender('Chest Pain','Female').subscribe(
    (response: Session[]) => {
      this.session = response;
      this.femalechestpain = this.session;
    });
  this.patientService.getSessionbydiagnosisandgender('Asathma','Female').subscribe(
      (response: Session[]) => {
        this.session = response;
        this.femaleasathma = this.session;
      });
  this.patientService.getSessionbydiagnosisandgender('Muscle or body aches','Female').subscribe(
        (response: Session[]) => {
          this.session = response;
          this.femalemuscle = this.session;
        });
  this.patientService.getSessionbydiagnosisandgender('Cough','Female').subscribe(
          (response: Session[]) => {
            this.session = response;
            this.femalecough = this.session;
          });
  this.patientService.getSessionbydiagnosisandgender('Diarrhea','Female').subscribe(
            (response: Session[]) => {
              this.session = response;
              this.femalediarrhea = this.session;
            });
  this.patientService.getSessionbydiagnosisandgender('Sore Throat','Female').subscribe(
              (response: Session[]) => {
                this.session = response;
                this.femalethroat = this.session;
              });
  this.patientService.getSessionbydiagnosisandgender('Other','Female').subscribe(
                (response: Session[]) => {
                  this.session = response;
                  this.femaleother = this.session;
                });
  }

  public getPatientByMalediagnosis(): void{
    this.patientService.getSessionbydiagnosisandgender('Fever','Male').subscribe(
      (response: Session[]) => {
        this.session = response;
        this.malefever = this.session;
      });
    this.patientService.getSessionbydiagnosisandgender('Headache','Male').subscribe(
        (response: Session[]) => {
          this.session = response;
          this.maleheadache = this.session;
        });
    this.patientService.getSessionbydiagnosisandgender('Chest Pain','Male').subscribe(
      (response: Session[]) => {
        this.session = response;
        this.malechestpain = this.session;
      });
    this.patientService.getSessionbydiagnosisandgender('Asathma','Male').subscribe(
        (response: Session[]) => {
          this.session = response;
          this.maleasathma = this.session;
        });
    this.patientService.getSessionbydiagnosisandgender('Muscle or body aches','Male').subscribe(
          (response: Session[]) => {
            this.session = response;
            this.malemuscle = this.session;
          });
    this.patientService.getSessionbydiagnosisandgender('Cough','Male').subscribe(
            (response: Session[]) => {
            this.session = response;
            this.malecough = this.session;
            });
    this.patientService.getSessionbydiagnosisandgender('Diarrhea','Male').subscribe(
              (response: Session[]) => {
              this.session = response;
              this.malediarrhea = this.session;
              });
    this.patientService.getSessionbydiagnosisandgender('Sore Throat','Male').subscribe(
                (response: Session[]) => { 
              this.session = response;
              this.malethroat = this.session;
                });
    this.patientService.getSessionbydiagnosisandgender('Other','Male').subscribe(
                  (response: Session[]) => {
              this.session = response;
              this.maleother = this.session;
                  });
    }

//patient by gender
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });

   this.pieChartData = [this.malepatient.length,this.femalepatient.length];

  }
  
//disease count
  openLg1(content1: any) {
    this.modalService.open(content1, { size: 'lg' });

   this.barChartData = [
    {data: [this.patientcountfever.length, this.patientcountHeadache.length, this.patientcountChestPain.length,this.patientcountAsathma.length,
      this.patientcountMuscle.length,this.patientcountCough.length,this.patientcountDiarrhea.length,this.patientcountThroat.length,this.patientcountOther.length], label: 'Patient Count'}];  
  }
  //patient count with district
  openLg2(content2: any) {
    this.modalService.open(content2, { size: 'lg' });

   this.doughnutChartData = [this.patientcountcolombo.length,
     this.patientcountgampaha.length, 
     this.patientcountkaluthra.length,
     this.patientcountkandy.length,
     this.patientcountMatale.length,
     this.patientcountNuwaraeli.length,
     this.patientcountgalle.length,
     this.patientcountmatara.length,
     this.patientcounthambantota.length,
     this.patientcountjaffna.length, 
     this.patientcountkilinochchi.length,
     this.patientcountmanner.length,
     this.patientcountvavuniya.length,
     this.patientcountmullaitivu.length,
     this.patientcountbatticaloa.length,
     this.patientcountampara.length,
     this.patientcounttrinco.length,
     this.patientcountkurunagala.length,
     this.patientcountputtalam.length, 
     this.patientcountanuradapura.length, 
     this.patientcountpolonnaruwa.length,
     this.patientcountbadulla.length,
     this.patientcountmonaragala.length,
     this.patientcountrathnapura.length,
     this.patientcountkegalla.length];

  
  }

  //patient gender WITH DIagnosis
  openLg3(content3: any) {
    this.modalService.open(content3, { size: 'lg' });   
       this.barChart2Data = [
          {data: [this.femalefever.length, this.femaleheadache.length, this.femalechestpain.length,this.femaleasathma.length,
            this.femalemuscle.length,this.femalecough.length,this.femalediarrhea.length,this.femalethroat.length,this.femaleother.length], label: 'Female'},
            {data: [this.malefever.length, this.maleheadache.length, this.malechestpain.length,this.maleasathma.length,
              this.malemuscle.length,this.malecough.length,this.malediarrhea.length,this.malethroat.length,this.maleother.length], label: 'Male'}];
      

  }
  public pieChartLabels = ['Female Patient', 'Male Patient'];
  public pieChart13Labels = ['Total Patient'];
  public pieChartData = [1, 1];
  public pieChart13Data = [1, 1];
  public pieChartType : ChartType = 'pie';
  public pieChart14Labels = ['Female Patient', 'Male Patient'];
  public pieChart14Data = [1, 1];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
      };
  public barChartLabels = ['Fever', 'Headache', 'Chest Pain', 'Asathma', 'Muscle or body aches','Cough', 'Diarrhea','Sore Throat', 'Other'];
  public barChartType : ChartType= 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [10, 5, 2, 1, 13, 4, 7], label: 'Patient Count'}
  ];
  public barChartColors =[
    {
      backgroundColor: [
        'rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)','rgba(60,179,113,0.2)',
      ]}
    ]
      
  public doughnutChartLabels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
                                 'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
                                 'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
                                 'Kegalle'];
  public doughnutChartData = [10, 5, 2, 1, 13, 4, 7];
  public doughnutChartType: ChartType = 'doughnut';

  public patientcountcolombo : User[];  public patientcountgampaha : User[];
  public patientcountkurunagala : User[];
  public patientcountputtalam : User[];
  public patientcountanuradapura : User[];
  public patientcountpolonnaruwa : User[];
  public patientcountbadulla : User[];
  public patientcountkaluthra : User[];
  public patientcountkandy : User[];
  public patientcountMatale : User[];
  public patientcountNuwaraeli : User[];
  public patientcountgalle : User[];
  public patientcountmatara : User[];
  public patientcounthambantota : User[];
  public patientcountjaffna : User[];
  public patientcountkilinochchi : User[];
  public patientcountmanner : User[];
  public patientcountvavuniya : User[];
  public patientcountmullaitivu : User[];
  public patientcountbatticaloa : User[];
  public patientcountampara : User[];
  public patientcounttrinco : User[];
  public patientcountmonaragala : User[];
  public patientcountrathnapura : User[];
  public patientcountkegalla : User[];


  public barChart2Labels = ['Fever', 'Headache', 'Chest Pain', 'Asathma', 'Muscle or body aches','Cough', 'Diarrhea','Sore Throat', 'Other'];
  public barChart2Data = [
    {data: [10, 5, 2, 1, 13, 4, 7], label: 'Female'},
    {data: [10, 5, 2, 1, 1, 4, 8], label: 'Male'}
  ];

  public barChart4Labels = [ this.feverdistrict];
  public barChart4Data = [
    {data: this.fevercount, label: 'Patien'},
 
  ];

  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.patientService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }

    public getPatientBydiagnosisfever(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Fever').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.feverdistrict.push(this.sessiondata[1]);
          console.log(this.feverdistrict);
          this.fevercount.push(this.sessiondata[0]);
          console.log(this.fevercount); 
        }
        }
      )
     }

     openLg4(content4: any) {
      this.modalService.open(content4, { size: 'lg' });
       this.barChart4Labels = this.feverdistrict;
      this.barChart4Data = [
      {data: this.fevercount, label: 'Patient Count'}];
     }
        
    

    public getPatientBydiagnosisheadache(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Headache').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.headachedistrict.push(this.sessiondata[1]);
          console.log(this.headachedistrict);
          this.headachecount.push(this.sessiondata[0]);
          console.log(this.headachecount); 
        }
        }
      )
     }
     
    openLg5(content5: any) {
      this.modalService.open(content5, { size: 'lg' });
      this.barChart5Labels = this.headachedistrict;
      this.barChart5Data = [
      {data: this.headachecount, label: 'Patient Count'}];
  
    
    }
     public getPatientBydiagnosisasathma(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Asathma').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.asathmadistrict.push(this.sessiondata[1]);
          console.log(this.asathmadistrict);
          this.asathmacount.push(this.sessiondata[0]);
          console.log(this.asathmacount); 
        }
        }
      )
     }
     openLg6(content6: any) {
      this.modalService.open(content6, { size: 'lg' });
      this.barChart6Labels = this.asathmadistrict;
      this.barChart6Data = [
      {data: this.asathmacount, label: 'Patient Count'}];
    }
    public getPatientBydiagnosismuscle(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Muscle or body aches').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.muscledistrict.push(this.sessiondata[1]);
          console.log(this.muscledistrict);
          this.musclecount.push(this.sessiondata[0]);
          console.log(this.musclecount); 
        }
        }
      )
     }
     
     openLg7(content7: any) {
      this.modalService.open(content7, { size: 'lg' });
      this.barChart7Labels = this.muscledistrict;
      this.barChart7Data = [
      {data: this.musclecount, label: 'Patient Count'}];
    }
    public getPatientBydiagnosiscough(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Cough').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.coughdistrict.push(this.sessiondata[1]);
          console.log(this.coughdistrict);
          this.coughcount.push(this.sessiondata[0]);
          console.log(this.coughcount); 
        }
        }
      )
     }
     openLg8(content8: any) {
      this.modalService.open(content8, { size: 'lg' });
      this.barChart8Labels = this.coughdistrict;
      this.barChart8Data = [
      {data: this.coughcount, label: 'Patient Count'}];
    }
    public getPatientBydiagnosisdiarrhea(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Diarrhea').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.diarrheadistrict.push(this.sessiondata[1]);
          console.log(this.diarrheadistrict);
          this.diarrheacount.push(this.sessiondata[0]);
          console.log(this.diarrheacount); 
        }
        }
      )
     }
     openLg9(content9: any) {
      this.modalService.open(content9, { size: 'lg' });
      this.barChart9Labels = this.diarrheadistrict;
      this.barChart9Data = [
      {data: this.diarrheacount, label: 'Patient Count'}];
    }
    public getPatientBydiagnosisthroat(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Sore Throat').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.throatdistrict.push(this.sessiondata[1]);
          console.log(this.throatdistrict);
          this.throatcount.push(this.sessiondata[0]);
          console.log(this.throatcount); 
        }
        }
      )
     }
     openLg10(content10: any) {
      this.modalService.open(content10, { size: 'lg' });
      this.barChart10Labels = this.throatdistrict;
      this.barChart10Data = [
      {data: this.throatcount, label: 'Patient Count'}];
    }
    public getPatientBydiagnosisother(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Other').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.otherdistrict.push(this.sessiondata[1]);
          console.log(this.otherdistrict);
          this.othercount.push(this.sessiondata[0]);
          console.log(this.othercount); 
        }
        }
      )
     }
     openLg11(content11: any) {
      this.modalService.open(content11, { size: 'lg' });
      this.barChart11Labels = this.otherdistrict;
      this.barChart11Data = [
      {data: this.othercount, label: 'Patient Count'}];
    }
    
    public getPatientBydiagnosischestpain(): void{
      this.patientService.getSessionbydiagnosisanddistrict('Chest Pain').subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session)
          let myArray = this.session;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.chestpaindistrict.push(this.sessiondata[1]);
          console.log(this.chestpaindistrict);
          this.chestpaincount.push(this.sessiondata[0]);
          console.log(this.chestpaincount); 
        }
        }
      )
     }
     openLg12(content12: any) {
      this.modalService.open(content12, { size: 'lg' });
      this.barChart12Labels = this.chestpaindistrict;
      this.barChart12Data = [
      {data: this.chestpaincount, label: 'Patient Count'}];
    }
 

 
  public barChart5Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart5Data = [
    {data: [8, 5, 2, 1, 13, 4, 8], label: 'District'},
 
  ];


    

  public barChart6Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart6Data = [
    {data: [10, 5, 2, 3, 5, 4, 7], label: 'District'},
 
  ];

   

  public barChart7Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart7Data = [
    {data: [10, 5, 2, 1, 13, 4, 7], label: 'District'},
 
  ];

  public barChart8Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart8Data = [
    {data: [10, 5, 2, 1, 9, 3, 7], label: 'District'},
 
  ];

 
  public barChart9Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart9Data = [
    {data: [10, 6, 2, 11, 13, 4, 7], label: 'District'},
 
  ];
    
  public barChart10Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart10Data = [
    {data: [10, 5, 2, 1, 13, 4, 7], label: 'District'},
 
  ];


  public barChart11Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart11Data = [
    {data: [8, 5, 2, 4, 13, 4, 7] , label: 'District'},
 
  ];


   
  public barChart12Labels = [ 'Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
  'Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Moneragala','Ampara','Ratnapura',
  'Kegalle'];
  public barChart12Data = [
    {data: [9, 5, 2, 11, 13, 4, 7], label: 'District'},
 
  ];
 
    public getSessionbyUserEmail(): void{
      let email =  localStorage.getItem('email');
      console.log(email);
      this.patientService.getSessionbyUserEmail(email).subscribe(
        (response: Session[]) => {
          this.session = response;
          console.log(this.session.length);
          this.totalpatient = this.session.length;
        })
      }

    openLg13(content13: any) {
      this.modalService.open(content13, { size: 'md' });
  
     this.pieChart13Data = [this.session.length];
  
    }

    public getPricingByDoctor(): void{
      this.patientService.getTotalPricingByDoctor().subscribe(
        (response: Pricing[]) => {
          this.pricing = response;
          console.log(this.pricing)
          let myArray = this.pricing;
          for(let i = 0; i < myArray.length; i++){ 
          let childArray = myArray[i]; 
          this.sessiondata = childArray  
          this.doctorsname.push(this.sessiondata[1]);
          console.log(this.doctorsname);
          this.totalrevenue.push(this.sessiondata[0]);
          console.log(this.totalrevenue); 
        }
        }
      )
     }
     openLg14(content14: any) {
      this.modalService.open(content14, { size: 'lg' });
      this.pieChart14Labels = [this.doctorsname];
      this.pieChart14Data = [this.totalrevenue];
    }

    
  logout(){
    this.loginService.logOut();

  }

  }
