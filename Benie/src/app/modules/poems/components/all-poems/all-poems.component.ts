import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Poem } from 'src/app/classes/poem/poem';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-all-poems',
  templateUrl: './all-poems.component.html',
  styleUrls: ['./all-poems.component.css']
})
export class AllPoemsComponent implements OnInit {
  poems: any;

  constructor(
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
    this.getAllPoems();
    this.bg();
  }
  getAllPoems(){
    Notiflix.Loading.pulse('fetching poems...')
    this.poetryService.getAllPoems().subscribe({
      next: (res: Poem) => {
        Notiflix.Loading.remove();
        this.poems = res;
        console.warn(res)
        this.bg();
      }
    })
  }
  bg(){
    let s = (<HTMLDivElement>document.getElementById('sch'));
    s.style.color = 'white';
  }
}
