import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  user: any;
  listQuestions: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });

    const query = firestore.collection('questions', (order) => {
      return order.orderBy('createdAt', 'desc');
    });

    this.listQuestions = query.valueChanges();

    this.listQuestions.subscribe(x =>  console.log(x));
  }

  ngOnInit(): void {}
}
