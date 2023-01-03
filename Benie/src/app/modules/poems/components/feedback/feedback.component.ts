import { Component, Input, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  values = '';
  noInput = true;
  @Input() openBottomSheet: () => void;
  liked = 'like';
  poemId = 1;

  constructor() { }

  ngOnInit(): void {
  }
  likePoem(data: any){
    Notiflix.Notify.success('LIked!')
  }
  commentPoem(data: any){
    Notiflix.Notify.success('commented!')
  }
  poemReactions(id: any){
  }
  poemFeedbacks(id: any){
  }
  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }

}
