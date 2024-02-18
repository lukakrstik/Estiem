import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router"


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  user ?: firebase.default.User | null ;
  username : string = "";
  password : string = "";
  name: string = "";
  errMsg : string = ""



  login() {
    this.authService.login(this.username + "@example.com", this.password).then((user) => {
      if(user){
        // @ts-ignore
        this.name = user?.user?.email?.replace("@example.com", "").replace("t", "T").replace("m", "m ")
        this.router.navigate(['/locations']);
      }
    }).catch(err => {
      this.errMsg = err.code.replace("auth/", "");
      console.log(this.errMsg);
    })
  }
  logout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.authService.auth.user.subscribe(u => {
      this.user = u;
    })
  }
}
