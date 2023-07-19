import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pricing } from '../class/Pricing';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-revenuedetails',
  templateUrl: './revenuedetails.component.html',
  styleUrls: ['./revenuedetails.component.scss'],
  providers: [DatePipe]
})

export class RevenuedetailsComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  
  pricing: Pricing[];
  myDate = new Date();
  public pricingvalue : Pricing[];
  public totalvalues: number = 0;
  public sum : number=0;
  userdata: any=[];
  sortKey: string = ''; // Holds the current column name for sorting
  sortDirection: string = 'asc'; // Holds the current sort direction


  constructor(private pricingService : ConsultantService, public loginService:AuthenticationService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPricing();
    this.setRoles();
    let currentDateTime =this.datePipe.transform((new Date), 'MM/dd/yyyy');
  
    console.log(currentDateTime);
 this.getUserByEmail();
  }

  generatePDF(): void {
    const doc = new jsPDF('p', 'mm', 'a4');
    const table = this.table.nativeElement;

    html2canvas(table).then((canvas) => {
      const tableImgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(tableImgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('table.pdf');
    });
  }
  isAdmin: boolean = false;
  userrole: any = String;

  private setRoles(): void {
    let role =  localStorage.getItem("role");
    this.userrole = role;
    if(this.userrole === "Admin"){
       this.isAdmin = true; 
    }
 }
  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.pricingService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }
    logout(){
      this.loginService.logOut();
  
    }
  public getPricing(): void {
    this.pricingService.getPricing().subscribe(
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

  
  sort(column: string) {
    if (this.sortKey === column) {
      // If the same column is clicked, reverse the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set it as the sort key with ascending direction
      this.sortKey = column;
      this.sortDirection = 'asc';
    }
  }
 
}
