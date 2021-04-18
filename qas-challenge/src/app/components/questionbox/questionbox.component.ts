import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';



@Component({
  selector: 'app-questionbox',
  templateUrl: './questionbox.component.html',
  styleUrls: ['./questionbox.component.css']
})
export class QuestionboxComponent implements OnInit {

  user: any;
  question: string;
  description: string;
  idQuestion: any;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore, private route: Router
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  createQuestion() {
    this.idQuestion = Math.floor(Math.random() * 23432) + 1;
    this.auth.user
      .subscribe((user) => {
        this.firestore
          .collection("questions")
          .doc(this.idQuestion.toString())
          .set({
            "userUid": user.uid,
            "userName": user.displayName,
            "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
            "questionId": this.idQuestion,
            "question": this.question,
            "description": this.description,
            "photoUrl": user.photoURL,
          })
          .catch((error) => { console.log(error); });
      });
    this.route.navigate(["/questions"])
  }
}
