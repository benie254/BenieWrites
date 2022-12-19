import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifs: any = 6;

  constructor() { }

  ngOnInit(): void {
  }
  checkViews(){
    let hasVisited = sessionStorage.getItem('washere');
    if ( ! hasVisited ) {
    Notiflix.Notify.success('Welcome to Benie Writes!');
    sessionStorage.setItem('washere', true.toString());
    } else {
      this.notifs = '';
      sessionStorage.removeItem('washere')
    }
  }

}
