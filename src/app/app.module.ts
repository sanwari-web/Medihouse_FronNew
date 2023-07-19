import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantprofileComponent } from './consultantprofile/consultantprofile.component';
import { ConsultantsessionComponent } from './consultantsession/consultantsession.component';

import { IgxStepperModule, IgxButtonModule, IgxButtonGroupModule, IgxInputGroupModule, IgxRadioModule } from "igniteui-angular";
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { RevenuedetailsComponent } from './revenuedetails/revenuedetails.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReportpageComponent } from './reportpage/reportpage.component';
import { ConsultantlistComponent } from './consultantlist/consultantlist.component';
import { SessionpricingComponent } from './sessionpricing/sessionpricing.component';
import { SessiondetailsComponent } from './sessiondetails/sessiondetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { DatePipe } from '@angular/common';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { ViewsessionsComponent } from './viewsessions/viewsessions.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { PatientappointmentsComponent } from './patientappointments/patientappointments.component';
import { ConsultantroomComponent } from './consultantroom/consultantroom.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConsultantprofileComponent,
    ConsultantsessionComponent,
    PatientDetailsComponent,
    PatientHistoryComponent,
    RevenuedetailsComponent,
    PatientdashboardComponent,
    HomepageComponent,
    ReportpageComponent,
    ConsultantlistComponent,
    SessionpricingComponent,
    SessiondetailsComponent,
    LogoutComponent,
    FooterComponent,
    PatientprofileComponent,
    ViewsessionsComponent,
    EditprofileComponent,
    AppointmentFormComponent,
    PatientDetailsComponent,
    AppointmentlistComponent,
    PatientappointmentsComponent,
    ConsultantroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    IgxStepperModule,
	IgxButtonModule,
	IgxButtonGroupModule,
  BrowserAnimationsModule,
  IgxButtonGroupModule,
	IgxInputGroupModule,
	IgxRadioModule,
  CdkStepperModule,
  MatStepperModule,
  ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
