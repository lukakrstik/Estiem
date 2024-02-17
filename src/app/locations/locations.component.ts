import {Component, OnInit} from '@angular/core';
import { AuthService } from "../auth.service";
import { DataHandleService } from "../data-handle.service";
import { LOCATIONS } from "../locations";
import { Location } from "../../location";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(private authService: AuthService, private dataHandle: DataHandleService)
  { }

  user ?: firebase.default.User | null;
  data : number[] = [];

  locations: Location[] = LOCATIONS;

  claim(index: number){
    this.check();
    setTimeout(() => {
      console.log(this.data);
      if(!this.data.includes(index)) {
        // @ts-ignore
        this.dataHandle.setPoints(this.user.uid, index, 20);
      }
      else{
        // @ts-ignore
        document.getElementById(`${index}`).style.backgroundColor = "red";
      }
    }, 100)
  }

  check(){
    // @ts-ignore
    this.dataHandle.getCompleted(this.user.uid).then((result) => {
      this.data = Object.values(result);
      console.log("Check: " + this.data);
    })
  }
  ngOnInit(): void {
    this.authService.auth.user.subscribe(u => {
      this.user = u;
    })
  }

}
