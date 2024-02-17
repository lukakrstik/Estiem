import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataHandleService {

  constructor(private db: AngularFireDatabase) {}

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
    return "Error Fetching Data";
  }
}
