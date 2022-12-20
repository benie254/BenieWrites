import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-ongoing-stories',
  templateUrl: './ongoing-stories.component.html',
  styleUrls: ['./ongoing-stories.component.css']
})
export class OngoingStoriesComponent implements OnInit {
  onStories: any;

  constructor(
    private service: MyStoryService,
  ) { }

  ngOnInit(): void {
    this.ongoingStories()
  }
  ongoingStories(){
    Notiflix.Loading.pulse('Fetching...')
    this.service.getOngoingStories().subscribe({
      next: (data) => {
        this.onStories = data;
        Notiflix.Loading.remove();
      }
    })
  }

}
