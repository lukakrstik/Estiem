import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {GamePageComponent} from "./game-page/game-page.component";


const routes: Routes = [
  { path: '', redirectTo: '/locations', pathMatch: "full" },
  { path: 'signin', component: SigninComponent },
  { path: 'locations', component: GamePageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
