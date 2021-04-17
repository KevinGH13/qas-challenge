import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent implements OnInit {

  listQuestion: any[] = [];
  user: any;
  question : Observable<any[]>
  

  constructor(private activatedRoute: ActivatedRoute, public auth: AngularFireAuth, public firestore:AngularFirestore) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });

    this.question = firestore.collection('questions').valueChanges();
  }

  ngOnInit(): void {
  this.getQuestion();
  }

  getQuestion(): any{
    this.question.subscribe(data => {
      this.listQuestion = data.filter(x => x.questionId == this.activatedRoute.snapshot.paramMap.get("uid"));
    });
  }


}