import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';


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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}