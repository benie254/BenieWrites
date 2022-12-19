import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { Story } from 'src/app/classes/story/story';
import { MyStoryService } from 'src/app/services/story/my-story.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];

  constructor(
    private storyService:MyStoryService,
  ) { }

  ngOnInit(): void {
    this.allStories();
  }
  
  removeS(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '1';
  }
  allStories(){
    Notiflix.Loading.pulse('Prepping the Lib...')
    this.storyService.getAllStories().subscribe({
      next: (data) => {
        this.stories = data;
        Notiflix.Loading.remove();
      }
    })
  }


}
