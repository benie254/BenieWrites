import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  poems: any;
  categ = '';

  constructor(
    private route:ActivatedRoute,
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.relatedPoems(params['id']),
        this.searchByDate(params['id'])
      }
    )
    this.bg();
  }
  relatedPoems(id: string){
    Notiflix.Loading.pulse('Retrieving...');
    this.poetryService.getRelatedPoems(id).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.poems = res;
        this.categ = id;
        this.bg();
      }
    })
  }
  bg(){
    let s = (<HTMLDivElement>document.getElementById('sch'));
    s.style.color = 'white';
  }
  searchByDate(date: string){
    Notiflix.Loading.pulse('Retrieving...');
    this.poetryService.searchByDate(date).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.poems = res;
      }
    })
  }
  back(){
    history.back();
  }

}
