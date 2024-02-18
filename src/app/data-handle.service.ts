import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandleService {

  constructor(private db: AngularFireDatabase) {}
  // Event Emitter
  invokePointsUpdate = new EventEmitter();
  subVar : Subscription | undefined;

  updatePoints() {
    this.invokePointsUpdate.emit();
  }
  //

  async getPoints(uid: String) {
    let ref = this.db.database.ref(uid + "/points");
    console.log("getPoints() Called.");
    let data = await ref.get()
    if(data.exists()){
      return data.exportVal();
    }
    return "Error Fetching Data";
  }

  async setPoints(uid: String , value: number, points: number) {
    let ref = this.db.database.ref(`${uid}/points`);
    ref.set(points + await this.getPoints(uid));
    ref = this.db.database.ref(`${uid}/completed`);
    ref.push(value);
  }

  async getCompleted(uid: String) {
    let ref = this.db.database.ref(uid + "/completed");
    console.log("getCompleted() Called.");
    let data = await ref.get()
    if(data.exists()){
      return data.exportVal();
    }
    else{
      ref.push(-1);
      return 'E';
    }

  }
}
