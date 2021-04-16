import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionboxComponent } from "./components/questionbox/questionbox.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { QuestiondetailsComponent } from "./components/questiondetails/questiondetails.component";


const routes: Routes = [
  { path: 'home', component: QuestionboxComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'questions/:id', component: QuestiondetailsComponent },
  { path: 'detail/:id', component: QuestiondetailsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

