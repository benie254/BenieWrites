import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { PoetryService } from './services/poetry.service';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  text = 'So, we live–we make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidable  make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidab';
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
      }
    })
  }
  pinnedPoem(){
    Notiflix.Loading.pulse('Retrieving...')
    this.poetryService.getPinnedPoems().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.pinned = res;
      }
    })
  }

}
