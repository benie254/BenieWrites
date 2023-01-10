import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  related: any;
  title: any;
  searchResults: any;
  exploreImg = 'https://res.cloudinary.com/benie/image/upload/v1669956626/undraw_questions_re_1fy7_w2hzi7.svg';
  id: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];

  constructor(
    private service:MyStoryService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.relatedStories(params["id"])
      }
    )
    this.allStories();
  }
  relatedStories(id: any){
    Notiflix.Loading.pulse('retrieving stories...')
    this.service.getRelatedStories(id).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.related = res;
        this.title = id;
      }
    })
  }
  allStories(){
    this.service.getAllStories().subscribe({
      next: (res) => {
        this.searchResults = res;
      }
    })
  }
  back(){
    history.back();
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.relatedStories(this.title);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.relatedStories(this.title);
  }

}
