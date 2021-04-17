import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  listQuestions: any[] = [
    {
      "id": 1,
      "question": "this is a question?",
      "user": "Name Lastname Lastname"
    },
    {
      "id": 2,
      "question": "this is other question?",
      "user": "Name Lastname Lastname"
    }
  ];

  user: any;


  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}