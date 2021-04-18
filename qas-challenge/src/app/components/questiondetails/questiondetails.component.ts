import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent implements OnInit {

  listQuestion: any[] = [];
  listAnswer: any[] = [];
  questionId: any;
  answer: string;
  user: any;
  question: Observable<any[]>;
  answers: Observable<any[]>;


  constructor(private activatedRoute: ActivatedRoute, public auth: AngularFireAuth, public firestore: AngularFirestore) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });

    this.question = firestore.collection('questions').valueChanges();

    const query = firestore.collection("answers", (order) => {
      return order.orderBy('positiveVotes', 'desc')
    });

    this.answers = query.valueChanges();
  }

  ngOnInit(): void {
    this.getQuestion();
    this.getAnswers();
  }

  getQuestion(): any {
    this.question.subscribe(data => {
      this.listQuestion = data.filter(x =>
        x.questionId == this.activatedRoute.snapshot.paramMap.get("uid")
      );
    });
  }

  getAnswers(): any {
    this.answers.subscribe(data => {
      this.listAnswer = data.filter(x => x.questionId == this.activatedRoute.snapshot.paramMap.get("uid"));
    })
  }

  createAnswer() {
    this.auth.user
      .subscribe((user) => {
        this.firestore
          .collection("answers")
          .add({
            "userUid": user.uid,
            "userName": user.displayName,
            "photoUrl": user.photoURL,
            "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
            "questionId": this.activatedRoute.snapshot.paramMap.get("uid"),
            "comment": this.answer,
            "positiveVotes": 0,
            "negativeVotes": 0,
          })
          .catch((error) => { console.log(error); });
      });
  }

  increaseVote(answerUid: number) {
    this.auth.user
      .subscribe(() => {
        this.firestore
          .collection("answers")
          .doc(answerUid.toString())
          .update({
            "positiveVotes": firebase.firestore.FieldValue.increment(1),
          })
      })
  }

  decreaseVote(answerUid: number) {
    this.auth.user
      .subscribe(() => {
        this.firestore
          .collection("answers")
          .doc(answerUid.toString())
          .update({
            "negativeVotes": firebase.firestore.FieldValue.increment(1),
          })
      })
  }


  
}
