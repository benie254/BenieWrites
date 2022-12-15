import { Component, OnInit } from '@angular/core';
import { Story } from '../classes/story/story';
import { StoriesService } from '../services/stories/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];

  constructor(
    private storyService:StoriesService,
  ) { }

  ngOnInit(): void {
    this.allStories();
  }
  onKey(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '0.7';
  }
  removeS(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '1';
  }
  allStories(){
    this.storyService.getAllStories().subscribe({
      next: (data) => {
        this.stories = data;
      }
    })
  }


}
