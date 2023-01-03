import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  text = 'So, we live–we make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidable  make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidab';
  locale: any;

  today = new Date();

  

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router:Router,
    private poetryService:PoetryService
  ) { }

  ngOnInit(): void {
  }
  
  
  poemReactions(id: any){
  }
  poemFeedbacks(id: any){
  }
  
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readBg'));
    const content = (<HTMLDivElement>document.getElementById('content'));
    const related = (<HTMLDivElement>document.getElementById('content-1'));
    const recent = (<HTMLDivElement>document.getElementById('content-2'));
    const comment = (<HTMLDivElement>document.getElementById('comment'));
    const read = (<HTMLDivElement>document.getElementById('reader'));
    const exp = (<HTMLDivElement>document.getElementById('expansion'));
    const comments = document.getElementById('comments');
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      comments.style.color = 'whitesmoke';
      recent.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      related.style.backgroundColor = 'rgb(31, 39, 44)';
      recent.style.backgroundColor = 'rgb(31, 39, 44)';
      comment.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      comments.style.color = 'black';
      recent.style.color = 'black';
      comment.style.backgroundColor = 'white';
      related.style.backgroundColor = 'white';
      exp.style.backgroundColor = 'white';
      recent.style.backgroundColor = 'white';
    }
  }
  back(){
    history.back();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'share.html',
})
export class BottomSheetOverviewExampleSheet {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  myLink(){
    this.copyLink(window.location.href);
  }
  copyLink(text: any){
    localStorage.setItem('myLink',text);
    this.storyLink = localStorage.getItem('myLink')
    console.warn("my link",this.storyLink)
    this.clipBoard(this.storyLink)
  }
  clipBoard(text: any){
    navigator.clipboard.writeText(text);
    Notiflix.Notify.success('Link Copied!')    
  }
}

