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
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];

  constructor(
    private service: MyStoryService,
  ) { }

  ngOnInit(): void {
    this.ongoingStories()
  }
  ongoingStories(){
    Notiflix.Loading.pulse('fetching stories...')
    this.service.getOngoingStories().subscribe({
      next: (data) => {
        this.onStories = data;
        Notiflix.Loading.remove();
      }
    })
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.ongoingStories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ongoingStories();
  }

}
