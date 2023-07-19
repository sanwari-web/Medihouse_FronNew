import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userrole: string;
  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {}
  // Provide username and password for authentication, and once authentication is successful, 
  //store JWT token in session
    authenticate(email: string, password: string) {
      return this.httpClient
        .post<any>("http://localhost:9090/api/login", { email, password })
        .pipe(
          map(userData => {
            localStorage.setItem("email", email);
            let tokenStr = "Bearer " + userData.token;
            localStorage.setItem("token", tokenStr);
            return userData;
          })
        );
    }
  
    isUserLoggedIn() {
      let user = localStorage.getItem("email");
      console.log(!(user === null));
      return !(user === null);
     
    }
    
    
    logOut() {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.router.navigate(['']);
    }
}
