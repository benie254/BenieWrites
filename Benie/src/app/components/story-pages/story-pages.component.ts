import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-story-pages',
  templateUrl: './story-pages.component.html',
  styleUrls: ['./story-pages.component.css']
})
export class StoryPagesComponent implements OnInit {
  values = '';
  noInput: boolean = true;
  chapterPages: any;
  chapDet: any;
  chaps: any;
  hide: boolean = false;
  story: any;
  myStory: any;
  storyId = localStorage.getItem('storyId');
  chapId: any;
  
  

  constructor(
    private _bottomSheet: MatBottomSheet,
    public service: MyStoryService,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    // this.storyChaps();
    this.route.params.subscribe(params => this.chapDetails(params['id']));
    this.route.params.subscribe(params => this.chapPages(params['id']));
  }
  
  
  
  chapDetails(id){
    this.service.getChapDetails(id).subscribe({
      next: (res) => {
        this.chapDet = res;
      }
    })
  }
  storyDetails(id: any){
    this.service.getStoryDetails(parseInt(id)).subscribe({
      next: (res) => {
        this.story = res;
        console.warn("tags",res)
      }
    })
  }
  storyChaps(id: any){
    this.service.getStoryChapters(id).subscribe({
      next: (res) => {
        this.chaps = res;
        console.warn(res,"chaps")
      }
    })
  }
  copy = (text: any): void => {
    localStorage.removeItem('chapId');
    localStorage.setItem('chapId',text);
    this.chapId = localStorage.getItem('chapId');
    console.warn('chap id:',this.chapId)
    this.router.navigate(['/read/story/chapter/' + this.chapId]);
    setTimeout(() => {
      location.reload();
    },0)
    
  }
  chapPages(id: any){
    this.service.getChapterPages(id).subscribe({
      next: (res) => {
        this.chapterPages = res;
        Notiflix.Notify.success("success!")
        console.warn("chap pages",res);
        this.storyDetails(this.storyId)
        this.storyChaps(this.storyId);
      }
    })
  }
  
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readSBg'));
    const content = (<HTMLDivElement>document.getElementById('sContent'));
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
    }
  }
  back(){
    this.router.navigate(['/read/story/' + this.storyId])
  }
  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  openBottomSheet(): void {
    this._bottomSheet.open(StoryDialog);
  }

 
  

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'share.html',
})
export class StoryDialog {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<StoryDialog>) {}

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
