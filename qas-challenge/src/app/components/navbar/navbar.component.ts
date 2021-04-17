import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  signIn() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  signOut() {
    this.auth.signOut();
    this.user = null;
  }

}
