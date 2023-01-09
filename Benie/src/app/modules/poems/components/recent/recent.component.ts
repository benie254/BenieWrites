import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  @Input() poems: any;
  poemId: any;
  poemT: any;
  poemC: any;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  copy(text: any){
    localStorage.setItem("poemId",text);
    this.poemId = localStorage.getItem("poemId");
    console.warn("id",this.poemId)
  }
  copyT(text: any){
    localStorage.setItem("poemTitle",text);
    this.poemT = localStorage.getItem("poemTitle");
  }
  copyC(text: any){
    localStorage.setItem("poemCateg",text);
    this.poemC = localStorage.getItem("poemCateg");
  }
  refresh(){
    this.router.navigate(['/poems/' + this.poemC + '/' + this.poemT + '/' + 'read' + this.poemId])
    setTimeout(() => {
      location.reload();
      localStorage.removeItem("poemId");
      localStorage.removeItem("poemTitle");
      localStorage.removeItem("poemCateg");
    },2)
  }

}
