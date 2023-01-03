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
  pinned: any;

  constructor(
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
    this.allPoems();
    this.pinnedPoem();
  }
  allPoems(){
    Notiflix.Loading.pulse('Retrieving...')
    this.poetryService.getAllPoems().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.poems = res.slice(0,4);
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
