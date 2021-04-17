import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent implements OnInit {

  listQuestion: any[] = [
    {
      "id": 1,
      "question": "this is a question?",
      "description": "Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.",
      "user": "Name Lastname Lastname",
      "positiveCount": 3,
      "negativeCount": 1,
      "comments": [
        {
          "id": 1,
          "comment": "this is a comment",
          "user": "Name Lastname Lastname",
          "positiveCount": 3,
          "negativeCount": 1,
        },
        {
          "id": 2,
          "comment": "this is a comment",
          "user": "Name Lastname Lastname",
          "positiveCount": 30,
          "negativeCount": 12,
        }
      ]
    },
    {
      "id": 2,
      "question": "this is other question?",
      "description": "Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.",
      "user": "Name Lastname Lastname",
      "positiveCount": 3,
      "negativeCount": 1,
      "comments": [
        {
          "id": 1,
          "comment": "this is a comment",
          "user": "Name Lastname Lastname",
          "positiveCount": 3,
          "negativeCount": 1,
        },
        {
          "id": 2,
          "comment": "this is a comment",
          "user": "Name Lastname Lastname",
          "positiveCount": 30,
          "negativeCount": 12,
        }
      ]
    }
  ];

  user: any;
  constructor(private activatedRoute: ActivatedRoute, public auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getQuestion(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getQuestion(id: String) {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.listQuestion = this.listQuestion.filter(x => x.id == params.id);
      }
    });
    console.log(this.listQuestion)
  }

}