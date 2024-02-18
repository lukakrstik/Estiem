import {Component, OnInit} from '@angular/core';
import { AuthService } from "../auth.service";
import { DataHandleService } from "../data-handle.service";
import { LOCATIONS } from "../locations";
import { Location } from "../../location";
import {set} from "@angular/fire/database";

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
  loading : boolean = true;

  locations: Location[] = LOCATIONS;

  claim(index: number){
      console.log(this.data);
      if(!this.data.includes(index)) {
        // @ts-ignore
        this.dataHandle.setPoints(this.user.uid, index, 20);
        // @ts-ignore
        document.getElementById(`${index}`).style.pointerEvents = "none";
        // @ts-ignore
        document.getElementById(`${index}`).style.opacity = "30%";
      }
      else{
        // @ts-ignore
        document.getElementById(`${index}`).style.pointerEvents = "none";
        // @ts-ignore
        document.getElementById(`${index}`).style.opacity = "30%";
      }
      this.check();
  }

  check(){
    // @ts-ignore
    this.dataHandle.getCompleted(this.user.uid).then((result) => {
      this.data = Object.values(result);
      console.log("Check: " + this.data);
      console.log("b" + this.data.length);
      if(this.loading) {
        for (let i = 0; i < this.data.length; i++) {
          console.log("a");
          // @ts-ignore
          document.getElementById(`${i}`).style.pointerEvents = "none";
          // @ts-ignore
          document.getElementById(`${i}`).style.opacity = "30%";
        }
        this.loading = false;
      }
    })
  }

  ngOnInit(): void {
    this.authService.auth.user.subscribe(u => {
      this.user = u;
      this.check()
    })
  }
}
