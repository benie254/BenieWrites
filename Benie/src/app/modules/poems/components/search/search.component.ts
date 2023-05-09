import { P } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  fetchPoemSuccess: boolean;
  noPoem: boolean;
  isLoading: boolean;
  foundPoems: any;
  empty: boolean;
  pValues = '';
  searchResults: any;
  searchText: any;
  title: any;
  poems: any;
  sInput: boolean = false;
  sValues = '';
  pInput: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [2, 5, 10, 15];

  constructor(
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
    this.allPoems();
  }
  reset(){
    this.sInput = false;
    let filter = (<HTMLFormElement>document.getElementById('filterForm'));
    filter.reset();
  }
  resetAlt(){
    this.pInput = false;
    let search = (<HTMLFormElement>document.getElementById('searchForm'));
    search.reset();
  }
  allPoems(){
    Notiflix.Loading.pulse('Fetching...')
    this.poetryService.getAllPoems().subscribe({
      next: (data) => {
        this.poems = data;
        Notiflix.Loading.remove();
        this.searchResults = data;
      }
    })
  }
  titleValue = (text: any): void => {
    this.title = text;
  }
  onSearch(event: any){
    this.pValues = event.target.value; 
    this.fetchPoemSuccess = false;
    this.noPoem = false;
    this.pInput = true;
  }
  onFilter(event: any){
    this.sValues = event.target.value;
    this.sInput = true;
  }
  search(poemDate: string): void{
    this.fetchPoemSuccess = false;
    this.noPoem = false;
    poemDate = this.pValues.trim();
    if (!poemDate) { return; }
    this.poetryService.searchByDate(poemDate);
    this.isLoading= true;
    this.getByDate(poemDate);
  }
  getByDate(poemDate: any): void{
    this.poetryService.searchByDate(poemDate).subscribe( data => {
        this.foundPoems = data;
        console.warn(data)
        if (this.foundPoems == undefined || this.foundPoems && this.foundPoems.length == 0){
          this.noPoem = true;
        } else {
          this.noPoem = false;
        }
        this.onTableDataChange(this.page)
      }
    );
    setTimeout(
      function(){
        this.isLoading= false;
        this.fetchPoemSuccess = true;
        if(this.fetchPoemSuccess = true && this.foundPoems.length == 0){
          this.empty = true;
        } else {
          this.empty = false;
        }
      }.bind(this),1000
    );
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.allPoems();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.allPoems();
  }

}
