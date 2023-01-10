import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  notifs: any = 6;
  searchResults: any;
  searchText: any;
  title: any;
  ongoing: any;
  completed: any;
  topOn: any;
  topCom: any;
  

  constructor(
    private service: MyStoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.checkViews();
    this.allStories();
    this.ongoingStories();
    this.completedStories();
  }
  reload(){
    setTimeout(() => {
      location.reload();
    },3)
  }
  allStories(){
    Notiflix.Loading.pulse('Retrieving...')
    this.service.getAllStories().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.searchResults = res;
      }
    })
  }
  ongoingStories(){
    this.service.getOngoingStories().subscribe({
      next: (res) => {
        this.ongoing = res;
        this.topOn = res.slice(0,2);
      }
    })
  }
  completedStories(){
    this.service.getCompletedStories().subscribe({
      next: (res) => {
        this.completed = res;
        this.topCom = res.slice(0,2);
      }
    })
  }
  titleValue = (text: any): void => {
    this.title = text;
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
