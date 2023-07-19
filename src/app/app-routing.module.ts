import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantprofileComponent } from './consultantprofile/consultantprofile.component';
import { ConsultantsessionComponent } from './consultantsession/consultantsession.component';
import { RevenuedetailsComponent } from './revenuedetails/revenuedetails.component';
// import { ReportProblemComponent } from './report-problem/report-problem.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
// import { PatientsloginComponent } from './patientslogin/patientslogin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
// import { SettingspageComponent } from './settingspage/settingspage.component';
import { ReportpageComponent } from './reportpage/reportpage.component';
import { ConsultantlistComponent } from './consultantlist/consultantlist.component';
import { SessionpricingComponent } from './sessionpricing/sessionpricing.component';
import { SessiondetailsComponent } from './sessiondetails/sessiondetails.component';
// import { SessionComponent } from './session/session.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { ViewsessionsComponent } from './viewsessions/viewsessions.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { PatientappointmentsComponent } from './patientappointments/patientappointments.component';
import { ConsultantroomComponent } from './consultantroom/consultantroom.component';

const routes: Routes = [
  {path : '', component : HomepageComponent },
  {path : 'dashboard', component : DashboardComponent },
  {path : 'patientdashboard', component : PatientdashboardComponent },
  {path : 'consultantprofile', component : ConsultantprofileComponent },
  {path : 'consultantsession', component : ConsultantsessionComponent },
  {path: 'consultantlist', component: ConsultantlistComponent},
  {path : 'patientdetails', component : PatientDetailsComponent },
  {path : 'patienthistory', component : PatientHistoryComponent },
  {path : 'revenuedetails', component : RevenuedetailsComponent },
  {path : 'reports', component : ReportpageComponent },
  {path : 'sessionpricing', component : SessionpricingComponent },
  {path : 'sessiondetails', component : SessiondetailsComponent  },
  {path: 'viewsession', component: ViewsessionsComponent},
  {path: 'patientprofile', component: PatientprofileComponent},
  {path: 'editprofile', component: EditprofileComponent},
  {path: 'appointmentlist', component: AppointmentlistComponent},
  {path: 'patientappointment', component: PatientappointmentsComponent},
  {path: 'consultantroom', component: ConsultantroomComponent},

   {path: 'logout', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
