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
  loading : boolean = true;

  locations: Location[] = LOCATIONS;

  async claim(index: number) {
    await this.check().then(() => {console.log(this.data + " Then data. AKO GO NEMA VEKE INDEKSOT PROBLEM");});
      if (!this.data.includes(index)) {
        // @ts-ignore
        if (document.getElementById("check" + index) != null && document.getElementById("check" + index).checked) {
          console.log("Checkbox Selected.");
          // @ts-ignore
          this.dataHandle.setPoints(this.user.uid,
            index,
            this.locations[index].points + parseInt(this.locations[index].extra.split(". Points: ")[1]))
            .then(() => {
              this.updatePoints();
            });
        } else {
          console.log("In Set points. " + this.data);
          // @ts-ignore
          this.dataHandle.setPoints(this.user.uid, index, this.locations[index].points).then(() => {
            this.updatePoints();
          });
        }
        // @ts-ignore
        document.getElementById(`${index}`).style.pointerEvents = "none";
        // @ts-ignore
        document.getElementById(`${index}`).style.opacity = "20%";
      } else {
        // @ts-ignore
        document.getElementById(`${index}`).style.pointerEvents = "none";
        // @ts-ignore
        document.getElementById(`${index}`).style.opacity = "20%";
      }
    await this.check();
  }

  async check(){
    // @ts-ignore
    await this.dataHandle.getCompleted(this.user.uid).then((result) => {
      this.data = Object.values(result);
      console.log("Check: " + this.data);
      console.log("Check Elements " + this.data.length);
      if(this.loading) {
        this.data.forEach((e) =>{
          if(e != -1){
            // @ts-ignore
            document.getElementById(`${e}`).style.pointerEvents = "none";
            // @ts-ignore
            document.getElementById(`${e}`).style.opacity = "20%";
          }
        })
        this.loading = false;
      }
    });
    console.log("Done Checking.")
  }
  updatePoints(){
    this.dataHandle.updatePoints();
  }
  ngOnInit(): void {
    this.authService.auth.user.subscribe(u => {
      this.user = u;
      this.check();
    })
  }
}
