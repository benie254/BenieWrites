import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-completed-stories',
  templateUrl: './completed-stories.component.html',
  styleUrls: ['./completed-stories.component.css']
})
export class CompletedStoriesComponent implements OnInit {
  compStories: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];

  constructor(
    private service: MyStoryService,
  ) { }

  ngOnInit(): void {
    this.completedStories()
  }
  completedStories(){
    Notiflix.Loading.pulse('fetching stories...')
    this.service.getCompletedStories().subscribe({
      next: (data) => {
        this.compStories = data;
        Notiflix.Loading.remove();
      }
    })
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.completedStories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.completedStories();
  }

}
