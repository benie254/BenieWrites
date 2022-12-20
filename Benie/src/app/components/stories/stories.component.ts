import { Component, Input, OnInit } from '@angular/core';
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
  onStories: Story[] = [];
  compStories: Story[] = [];
  @Input() searchResults: any;
  @Input() searchText: any;
  @Input() titleValue: (text: any) => void;

  constructor(
    private storyService:MyStoryService,
  ) { }

  ngOnInit(): void {
    this.allStories();
    this.completedStories();
  }
  
  removeS(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '1';
  }
  allStories(){
    Notiflix.Loading.pulse('Fetching...')
    this.storyService.getAllStories().subscribe({
      next: (data) => {
        this.stories = data;
        Notiflix.Loading.remove();
      }
    })
  }
  
  completedStories(){
    Notiflix.Loading.pulse('Prepping the Lib...')
    this.storyService.getCompletedStories().subscribe({
      next: (data) => {
        this.compStories = data;
        Notiflix.Loading.remove();
      }
    })
  }


}
