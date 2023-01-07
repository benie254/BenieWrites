import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifs: any = 6;
  searchResults: any;
  searchText: any;
  title: any;
  

  constructor(
    private service: MyStoryService,
  ) { }

  ngOnInit(): void {
    // this.checkViews();
    this.allStories();
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
