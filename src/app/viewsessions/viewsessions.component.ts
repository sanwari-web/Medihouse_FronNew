import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../class/Session';
import { ConsultantService } from '../consultant.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-viewsessions',
  templateUrl: './viewsessions.component.html',
  styleUrls: ['./viewsessions.component.scss']
})
export class ViewsessionsComponent implements OnInit {

  
  userdata: any=[];
  session: Session[];
  consultants:User[];
  patientid: any=[];
  patient:Session[];
  sessiondata: any=[];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService :ConsultantService,
    private sessiontService :ConsultantService,
    private consultantService: ConsultantService,
    public loginService:AuthenticationService) { }

  ngOnInit(): void {
    this.getSession();
    this.getUserByEmail();
  }
  filteredSessionData: any[] = []; // The filtered session data array

  filterTable() {
    // Get the filter values
    const dateFilter = (document.getElementById('searchDate') as HTMLInputElement).value;
    const nameFilter = (document.getElementById('searchName') as HTMLInputElement).value.toLowerCase();

    // Perform filtering
    this.filteredSessionData = this.sessiondata.filter((sessiondata: { date: string; patient: { first_name: string; last_name: string; }; }) => {
      const sessionDate = sessiondata.date.toLowerCase();
      const patientName = sessiondata.patient.first_name.toLowerCase() + ' ' + sessiondata.patient.last_name.toLowerCase();
      
      return sessionDate.includes(dateFilter) && patientName.includes(nameFilter);
    });
  }
     //search user in search bar
     public searchSession(key: string): void {
      console.log(key);
      const results: Session[] = [];
      for (const session of this.session) {
        if (session.diagnosis.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || session.reason.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(session);
        }
      }
      this.session = results;
      if (results.length === 0 || !key) {
        this.getSession();
      }
    }
    public searchSession2(key: string): void {
      console.log(key);
      const results: User[] = [];
      for (const patient of this.patient) {
        if (
         patient.patient_id.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(patient.patient_id);
        }
      }
      if (results.length === 0 || !key) {
        this.getSession();
      }
    }
  public getUserByEmail(): void{ 
    let email =  localStorage.getItem('email');
   console.log(email);
    this.patientService.getUserByEmail(email).subscribe(
      (response: User[]) => {
        this.userdata = response;
      })
    }
    
  public getSession(): void {
    this.sessiontService.getSession().subscribe(
      (response: Session[]) => {
        this.session = response;
        console.log(this.session);
        this.sessiondata = this.session;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  logout(){
    this.loginService.logOut();

  }
}
