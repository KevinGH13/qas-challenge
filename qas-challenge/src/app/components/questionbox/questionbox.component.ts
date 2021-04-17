import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-questionbox',
  templateUrl: './questionbox.component.html',
  styleUrls: ['./questionbox.component.css']
})
export class QuestionboxComponent implements OnInit {

  user: any;
  question: string;
  description: string;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }


  createQuestion() {
    this.auth.user
      .subscribe((user) => {
        this.firestore
          .collection("questions")
          .add({
            "uid": user.uid,
            "userName": user.displayName,
            "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
            "question": this.question,
            "description": this.description,
          })
          .catch((error) => { console.log(error); });
      });
  }
}
