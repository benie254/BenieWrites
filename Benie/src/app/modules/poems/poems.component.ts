import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { PoetryService } from './services/poetry.service';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  poems: any;
  twoPoems: any;
  pinned: any;
  allPoems: any;
  count = 0;
  poemId = '';

  constructor(
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
    this.getAllPoems();
    this.pinnedPoem();
    this.bg();
  }
  getAllPoems(){
    Notiflix.Loading.pulse('Retrieving...')
    this.poetryService.getAllPoems().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.allPoems = res;
        this.poems = res.slice(0,4);
        this.twoPoems = res.slice(0,2);
        this.count = parseInt(this.allPoems.length) - parseInt(this.poems.length);
        this.bg();
      }
    })
  }
  bg(){
    let s = (<HTMLDivElement>document.getElementById('sch'));
    s.style.color = 'white';
  }
  pinnedPoem(){
    Notiflix.Loading.pulse('Retrieving...')
    this.poetryService.getPinnedPoems().subscribe({
      next: (res) => {
        this.pinned = res;
        Notiflix.Loading.remove();
      }
    })
  }
}
