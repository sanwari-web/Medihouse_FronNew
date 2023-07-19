import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from './class/Session';
import { ConsultantService } from './consultant.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  public session:Session[];

  userdata: any =[];
  user:User[];
  public userdetails : User[];
  consultants:User[];

  constructor(private route: ActivatedRoute,private consultantService: ConsultantService, private router: Router) { }

  ngOnInit(): void {
  }



}
