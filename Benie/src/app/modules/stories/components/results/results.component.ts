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
    Notiflix.Loading.pulse('Retrieving...')
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

}
