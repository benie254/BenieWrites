import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from '../services/story/my-story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
