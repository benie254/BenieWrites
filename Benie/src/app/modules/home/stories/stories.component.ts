import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onKey(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '0.7';
  }
  removeS(event: any){
    const myD = (<HTMLDivElement>document.getElementById('myDiv'));
    myD.style.opacity = '1';
  }


}
