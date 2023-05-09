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
  nothingImg = 'https://res.cloudinary.com/benie/image/upload/v1669956626/undraw_questions_re_1fy7_w2hzi7.svg';
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];
  dateInput: any;
  values = '';

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
        this.onTableDataChange(this.page)
      }
    })
  }
  back(){
    history.back();
  }
  onKey(event: any){
    this.values = event.target.value;
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.relatedPoems(this.categ);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.relatedPoems(this.categ);
  }
}
