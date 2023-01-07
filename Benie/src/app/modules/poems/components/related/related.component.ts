import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  @Input() topRelated: any;
  poemId: any;
  poemT: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  copy(text: any){
    localStorage.setItem("poemId",text);
    this.poemId = localStorage.getItem("poemId");
  }
  copyT(text: any){
    localStorage.setItem("poemTitle",text);
    this.poemT = localStorage.getItem("poemTitle");
  }
  refresh(){
    this.router.navigate(['/poems/' + this.poemT + '/' + this.poemId])
    location.reload();
  }


}
