import { Component, Input, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Story } from 'src/app/classes/story/story';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.css']
})
export class AllStoriesComponent implements OnInit {
  stories: Story[] = [];
  onStories: Story[] = [];
  compStories: Story[] = [];
  @Input() searchResults: any;
  @Input() searchText: any;
  @Input() titleValue: (text: any) => void;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];

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
    Notiflix.Loading.pulse('fetching stories...')
    this.storyService.getAllStories().subscribe({
      next: (data) => {
        this.stories = data;
        Notiflix.Loading.remove();
      }
    })
  }
  completedStories(){
    Notiflix.Loading.pulse('prepping library...')
    this.storyService.getCompletedStories().subscribe({
      next: (data) => {
        this.compStories = data;
        Notiflix.Loading.remove();
      }
    })
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.allStories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.allStories();
  }
}
