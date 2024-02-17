import {Component, OnDestroy, OnInit} from '@angular/core';
import { Team } from "../team";
import { DataHandleService } from "../data-handle.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  teams: Team[] = [
    {name: "Team 1",uid: "gOocmj5ZSIUKcx3TI3XQ5MbgF633", points: 0},
    {name: "Team 2",uid: "nRkfKDQBs1TU8r6JctBiWvTt79G2", points: 0},
    {name: "Team 3",uid: "NJFySmRlJ3cLUe3tWzCWEQAZkVt2", points: 0},
    {name: "Team 4",uid: "ezQ90iH1NjNSOUj0VqT9UNuk7V13", points: 0},
    {name: "Team 5",uid: "Yg4BUO3UnGNaTAca9QXMqy2VWuC2", points: 0},
  ]
  constructor(private dataHandler: DataHandleService) {}

  ngOnInit(): void {
    for(let i = 0; i < 5; i++){
      this.dataHandler.getPoints(this.teams[i].uid).then((result) => {
        this.teams[i].points = result;
      })
    }
  }

  ngOnDestroy(): void {
  }
}
