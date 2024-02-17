import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  user ?: firebase.default.User | null ;
  username ?: String | null;

  logout(){
    this.authService.logout();
    this.router.navigate(['/signin'])
  }
  redirectToLogin(){
    this.router.navigate(['/signin'])
  }
  ngOnInit() {
    this.authService.auth.user.subscribe(u => {
      this.user = u;
      this.username = u?.email?.replace("@example.com", "").replace("t", "T").replace("m", "m ");
    })
  }

}
